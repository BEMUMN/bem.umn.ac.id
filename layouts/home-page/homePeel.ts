type Point = readonly [number, number];

type HomePeelElements = {
    readonly root: HTMLElement;
    readonly sheet: HTMLElement;
    readonly flap: SVGSVGElement;
    readonly flapPaper: SVGPolygonElement;
    readonly flapShadowNear: SVGPolygonElement;
    readonly flapShadowFar: SVGPolygonElement;
    readonly flapGradient: SVGLinearGradientElement;
    readonly cast: SVGSVGElement;
    readonly castPolygon: SVGPolygonElement;
    readonly castGradient: SVGLinearGradientElement;
};

type HomePeel = {
    measure: () => void;
    render: (progress: number) => void;
    reset: () => void;
};

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
const easeInOut = (value: number) => {
    const progress = clamp(value);
    return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
};

function clipHalfPlane(points: readonly Point[], inside: (point: Point) => number): Point[] {
    const clipped: Point[] = [];

    points.forEach((point, index) => {
        const next = points[(index + 1) % points.length];
        const currentDistance = inside(point);
        const nextDistance = inside(next);

        if (currentDistance >= 0) {
            clipped.push(point);
        }

        if ((currentDistance >= 0) !== (nextDistance >= 0)) {
            const ratio = currentDistance / (currentDistance - nextDistance);
            clipped.push([
                point[0] + (next[0] - point[0]) * ratio,
                point[1] + (next[1] - point[1]) * ratio,
            ]);
        }
    });

    return clipped;
}

function polygonPoints(points: readonly Point[]) {
    return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

function polygonClipPath(points: readonly Point[]) {
    if (points.length < 3) {
        return "polygon(0 0, 0 0, 0 0)";
    }

    return `polygon(${points.map(([x, y]) => `${x.toFixed(1)}px ${y.toFixed(1)}px`).join(", ")})`;
}

export function createHomePeel(elements: HomePeelElements): HomePeel {
    const { root, sheet, flap, flapPaper, flapShadowNear, flapShadowFar, flapGradient, cast, castPolygon, castGradient } = elements;
    const from = 0.05;
    const to = 0.88;
    const rest = 72;
    const lift = 0.48;
    let width = 0;
    let height = 0;

    const measure = () => {
        width = root.clientWidth;
        height = root.clientHeight;

        [flap, cast].forEach((svg) => svg.setAttribute("viewBox", `0 0 ${width} ${height}`));
    };

    const reset = () => {
        root.style.removeProperty("--home-peel");
        sheet.style.removeProperty("clip-path");
        sheet.style.removeProperty("pointer-events");
        flap.style.removeProperty("display");
        cast.style.removeProperty("display");
    };

    const render = (progress: number) => {
        if (!width || !height) {
            measure();
        }

        const foldProgress = easeInOut((progress - from) / (to - from));
        root.style.setProperty("--home-peel", foldProgress.toFixed(4));
        sheet.style.pointerEvents = foldProgress > 0.55 ? "none" : "";

        const angle = (Math.atan2(height, width) + Math.PI / 4) / 2;
        const normalX = Math.cos(angle);
        const normalY = Math.sin(angle);
        const maximum = width * normalX + height * normalY;
        const foldLine = (maximum - Math.min(rest, maximum * 0.5)) * (1 - foldProgress);
        const rectangle: Point[] = [[0, 0], [width, 0], [width, height], [0, height]];

        const remainingSheet = clipHalfPlane(
            rectangle,
            ([x, y]) => foldLine - (normalX * x + normalY * y),
        );
        sheet.style.clipPath = polygonClipPath(remainingSheet);

        const liftedSheet = clipHalfPlane(
            rectangle,
            ([x, y]) => normalX * x + normalY * y - foldLine,
        );

        if (liftedSheet.length < 3 || foldLine <= 0.5) {
            flap.style.display = "none";
            cast.style.display = "none";
            return;
        }

        flap.style.display = "block";
        cast.style.display = "block";

        let maximumDistance = 0;
        const reflectedFlap = liftedSheet.map(([x, y]) => {
            const distance = normalX * x + normalY * y - foldLine;
            maximumDistance = Math.max(maximumDistance, distance);
            return [
                x - (1 + lift) * distance * normalX,
                y - (1 + lift) * distance * normalY,
            ] satisfies Point;
        });
        flapPaper.setAttribute("points", polygonPoints(reflectedFlap));

        const shadowOffset = (distance: number) => reflectedFlap.map(([x, y]) => [
            x - normalX * distance * 0.6,
            y - normalY * distance * 0.6 + distance * 0.5,
        ] satisfies Point);
        const shadowDepth = Math.min(maximumDistance * 0.06, 18);
        flapShadowNear.setAttribute("points", polygonPoints(shadowOffset(shadowDepth * 0.5)));
        flapShadowFar.setAttribute("points", polygonPoints(shadowOffset(shadowDepth)));

        const foldX = foldLine * normalX;
        const foldY = foldLine * normalY;
        const flapEndX = foldX - normalX * lift * maximumDistance;
        const flapEndY = foldY - normalY * lift * maximumDistance;
        flapGradient.setAttribute("x1", foldX.toFixed(1));
        flapGradient.setAttribute("y1", foldY.toFixed(1));
        flapGradient.setAttribute("x2", flapEndX.toFixed(1));
        flapGradient.setAttribute("y2", flapEndY.toFixed(1));

        const castWidth = Math.min(28 + maximumDistance * 0.16, 140);
        const castStrip = clipHalfPlane(
            clipHalfPlane(rectangle, ([x, y]) => normalX * x + normalY * y - foldLine),
            ([x, y]) => foldLine + castWidth - (normalX * x + normalY * y),
        );
        castPolygon.setAttribute("points", polygonPoints(castStrip));
        castGradient.setAttribute("x1", foldX.toFixed(1));
        castGradient.setAttribute("y1", foldY.toFixed(1));
        castGradient.setAttribute("x2", (foldX + normalX * castWidth).toFixed(1));
        castGradient.setAttribute("y2", (foldY + normalY * castWidth).toFixed(1));
    };

    measure();
    return { measure, render, reset };
}
