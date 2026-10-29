import os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

def generate_svg():
    font_path = os.path.join("public", "fonts", "AppleGaramond.ttf")
    font = TTFont(font_path)
    glyph_set = font.getGlyphSet()

    # Exact scale & baseline matched to BEM_GEN_16_LOGO_LIGHT.svg
    scale = 0.89747235
    y_baseline = 916.71

    current_x = 0
    all_cmds = []
    for char in ['B', 'E', 'M']:
        pen = SVGPathPen(glyph_set)
        t_pen = TransformPen(pen, (scale, 0, 0, -scale, current_x, y_baseline))
        glyph_set[char].draw(t_pen)
        all_cmds.append(pen.getCommands())
        width = font['hmtx'][char][0]
        current_x += width * scale

    total_width = round(current_x)
    combined_path = ' '.join(all_cmds)

    # Standalone SVG with exact same viewBox height 1166
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {total_width} 1166" width="{total_width}" height="1166">
  <path fill="#F2F2F2" fill-rule="evenodd" d="{combined_path}"/>
</svg>'''

    output_path = os.path.join("public", "svgs", "BEM_TEXT_LIGHT.svg")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Successfully generated {output_path} (width={total_width}, height=1166)")

if __name__ == "__main__":
    generate_svg()
