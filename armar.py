"""Arma index.html (un solo archivo autocontenido, sin recursos de terceros) a partir de src/.
Uso:  python armar.py"""
import os, re, urllib.parse
R = os.path.dirname(os.path.abspath(__file__))
S = os.path.join(R, 'src')
leer = lambda n: open(os.path.join(S, n), encoding='utf-8').read()
css = leer('01_estilo_base.css') + '\n' + leer('02_estilo_telar.css')
js = '\n'.join(leer(n) for n in ['10_stack.js', '11_territorio.js', '12_gei.js', '30_motor.js', '45_graficos.js', '50_app.js'])
logo = open(os.path.join(R, 'logo.svg'), encoding='utf-8').read().strip()
fav = 'data:image/svg+xml,' + urllib.parse.quote(logo)
ico = re.sub(r'<rect[^>]*/>', '', logo.replace('<svg ', '<svg aria-hidden="true" ', 1).replace('id="g"', 'id="gl"'))
secs = ['inicio', 'territorio', 'stack', 'red', 'dimensiones', 'gei', 'prospectiva', 'ahorro', 'tablero', 'ciencia']
html = f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ratio Telar — Conocimiento local como sistema complejo adaptativo · Local knowledge as a complex adaptive system</title>
<meta name="description" content="Ratio Telar (Ratio Complexus): el Stack de Conocimiento Local del maíz criollo, la red de actores y la Gestión Estratégica Integrada de los recursos naturales, regionalizado para México. ES/EN, para productores y científicos.">
<link rel="icon" href="{fav}">
<!--
  Ratio Telar · primera aplicación de Ratio Complexus («lo que está tejido junto»)
  Un solo archivo (HTML + CSS + JavaScript). Sin servidor, sin instalación, sin recursos de terceros.
  Autores: Héctor Tecumshé Mojica-Zárate · Óscar Díaz-José · Luis Ángel Barrera-Guzmán · Guadalupe Velázquez-Vázquez
  Licencia MIT. Fuentes: Díaz-José et al. (2026) doi:10.22231/asyd.v23i3.1822; Mojica Zárate (2017), tesis doctoral UCLV; INEGI (2020).
-->
<style>
{css}
</style>
</head>
<body>
<header class="bar"><div class="bar-top">
 <button class="brand" data-sec="inicio" aria-label="Ratio Telar"><span class="brand-ico">{ico}</span><span><span class="brand-name">Ratio <b>Telar</b></span><br><span class="brand-sub">Ratio Complexus</span></span></button>
 <span class="sp"></span>
 <button class="ibtn" id="bModo"></button>
 <button class="ibtn round" id="bLang" title="Idioma / Language"></button>
 <button class="ibtn round" id="bTema" title="Tema claro u oscuro / Light or dark theme" aria-label="Tema">◐</button>
 <button class="ibtn round no-print" id="bExp" title="Exportar JSON / Export JSON" aria-label="Exportar">⤓</button>
 <button class="ibtn round no-print" id="bImp" title="Importar JSON / Import JSON" aria-label="Importar">⤒</button>
 <button class="ibtn round no-print" id="bImpr" title="Imprimir / Print" aria-label="Imprimir">⎙</button>
 <input type="file" id="fImp" accept="application/json" hidden>
</div><nav class="steps-nav" id="nav"></nav></header>
<main>
{''.join(f'<section class="sec" id="s-{s}"></section>' for s in secs)}
</main>
<footer class="pie"><p>Ratio Telar · Ratio Complexus · Héctor Tecumshé Mojica-Zárate, Óscar Díaz-José, Luis Ángel Barrera-Guzmán, Guadalupe Velázquez-Vázquez · MIT · <a href="https://hectortecumshe-ai.github.io/">hectortecumshe-ai.github.io</a></p></footer>
<script>
{js}
</script>
</body>
</html>
'''
open(os.path.join(R, 'index.html'), 'w', encoding='utf-8', newline='\n').write(html)
ext = re.findall(r'(?:src|href)="(https?://[^"]+)"', html)
print('index.html', len(html.encode()) // 1024, 'KB · enlaces externos en src/href:', sorted(set(e.split('/')[2] for e in ext)))
