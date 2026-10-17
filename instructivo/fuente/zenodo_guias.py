"""Deposita en Zenodo los instructivos de Ratio Telar, uno por registro (PDF en español + PDF en inglés), con DOI propio.
El token NO se escribe aquí: se lee del archivo C:\\Users\\<usuario>\\.zenodo_token (fuera de los repositorios).
Uso:
  python zenodo_guias.py reservar   → crea los dos borradores y reserva sus DOI (los escribe en doi_guias.json)
  python zenodo_guias.py subir      → sube los PDF (ya rearmados con su DOI) a cada borrador
  python zenodo_guias.py publicar   → publica los dos registros
Solo usa la biblioteca estándar de Python (urllib)."""
import json, os, sys, urllib.request

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.normpath(os.path.join(AQUI, '..', '..'))
API = 'https://zenodo.org/api'
TOKEN = open(os.path.join(os.path.expanduser('~'), '.zenodo_token'), encoding='utf-8').read().strip()
ESTADO = os.path.join(AQUI, 'doi_guias.json')
CREADORES = [{'name': 'Mojica-Zárate, Héctor Tecumshé', 'orcid': '0000-0002-9067-3983'}, {'name': 'Díaz-José, Óscar'},
             {'name': 'Barrera-Guzmán, Luis Ángel'}, {'name': 'Velázquez-Vázquez, Guadalupe'}]
GUIAS = {
  'productor': dict(pdfs=['RatioTelar-Instructivo-Productor.pdf', 'RatioTelar-Producer-Guide.pdf'],
    title='Ratio Telar: Instructivo del Productor / Producer Guide (2.ª edición, versión 0.5.0)',
    description='Instructivo bilingüe (español e inglés) para productores y técnicos de Ratio Telar 0.5.0, aplicación libre que representa una milpa, parcela o unidad de producción como sistema complejo adaptativo. Recorre los 13 bloques con el caso resuelto del maíz criollo de Calpan, Puebla (Díaz-José et al., 2026), explica cómo distinguir lo que llena el usuario de lo sugerido y del ejemplo publicado, e incluye guía de entrevista, cuatro hojas de campo imprimibles, problemas frecuentes y glosario. 2.ª edición, octubre de 2026.'),
  'cientifico': dict(pdfs=['RatioTelar-Instructivo-Cientifico.pdf', 'RatioTelar-Scientist-Guide.pdf'],
    title='Ratio Telar: Instructivo del Científico / Scientist Guide (2.ª edición, versión 0.5.0)',
    description='Instructivo bilingüe (español e inglés) para investigación y docencia de Ratio Telar 0.5.0: modelo de datos, red ponderada y su estadística, cladograma del vecino más cercano, índices de sostenibilidad (Sarandón, ODS, huella de carbono IPCC), regeneración y riesgo, modelo de escenarios, validación frente a NetworkX y SciPy, reproducibilidad y un ejemplo resuelto a mano. 2.ª edición, octubre de 2026.'),
}
def llamar(metodo, url, datos=None, binario=None, tipo='application/json'):
    cuerpo = binario if binario is not None else (json.dumps(datos).encode('utf-8') if datos is not None else None)
    r = urllib.request.Request(url, data=cuerpo, method=metodo, headers={'Authorization': 'Bearer ' + TOKEN, 'Content-Type': tipo if cuerpo is not None else 'application/json'})
    with urllib.request.urlopen(r, timeout=300) as f:
        t = f.read(); return json.loads(t) if t else {}
def meta(g):
    return {'metadata': {'upload_type': 'publication', 'publication_type': 'other', 'title': g['title'], 'description': g['description'],
        'creators': CREADORES, 'license': 'cc-by-4.0', 'language': 'spa', 'version': '2.ª edición', 'prereserve_doi': True,
        'keywords': ['Ratio Telar', 'instructivo', 'manual', 'sistemas complejos adaptativos', 'conocimiento local', 'maíz criollo', 'sostenibilidad', 'México'],
        'related_identifiers': [{'identifier': '10.5281/zenodo.23290103', 'relation': 'isSupplementTo', 'scheme': 'doi', 'resource_type': 'software'},
                                {'identifier': '10.22231/asyd.v23i3.1822', 'relation': 'references', 'scheme': 'doi'}]}}
est = json.load(open(ESTADO, encoding='utf-8')) if os.path.exists(ESTADO) else {}
paso = sys.argv[1] if len(sys.argv) > 1 else ''
if paso == 'reservar':
    for k, g in GUIAS.items():
        if k in est: print(k, 'ya reservado:', est[k]['doi']); continue
        d = llamar('POST', API + '/deposit/depositions', meta(g))
        est[k] = {'id': d['id'], 'doi': d['metadata']['prereserve_doi']['doi'], 'bucket': d['links']['bucket']}
        print(k, est[k]['doi'])
    json.dump(est, open(ESTADO, 'w', encoding='utf-8'), indent=1)
elif paso == 'subir':
    for k, g in GUIAS.items():
        for pdf in g['pdfs']:
            ruta = os.path.join(RAIZ, 'instructivo', pdf)
            llamar('PUT', est[k]['bucket'] + '/' + pdf, binario=open(ruta, 'rb').read(), tipo='application/octet-stream')
            print(k, 'subido', pdf, round(os.path.getsize(ruta) / 1048576, 1), 'MB')
elif paso == 'publicar':
    for k in GUIAS:
        d = llamar('POST', API + '/deposit/depositions/%d/actions/publish' % est[k]['id'])
        print(k, 'publicado', d.get('doi'), d.get('links', {}).get('record_html'))
else:
    print(__doc__)
