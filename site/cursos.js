// Generaciones del curso en vivo y su forma de pago. Las páginas muestran la generación más próxima:
// la primera cuyo inicio aún no pasa (si todas pasaron, la última).
// Reglas de pago (aplican a todas las generaciones):
//   · Pago único: 10 % de descuento sobre el precio de la generación.
//   · O 3 pagos iguales: el primero en la fecha de inicio, el segundo un mes después y el tercero dos meses después.
//   · Lo pagado de Augmented Studio en los 12 meses anteriores a la inscripción se descuenta.
// Cada elemento con data-curso="clave" recibe el texto calculado; sin JavaScript queda el texto escrito en la página.
(function () {
  const CURSOS = [
    { id: "G1", nombre: "Generación 1", inicio: "2027-01-08", fin: "2027-03-20", precio: 9900, regular: 14900 },
  ];
  const DESCUENTO_PAGO_UNICO = 0.10;
  const PAGOS = 3;

  const hoy = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Mexico_City" });
  const ordenados = CURSOS.slice().sort((a, b) => a.inicio.localeCompare(b.inicio));
  const curso = ordenados.find((c) => c.inicio >= hoy) || ordenados[ordenados.length - 1];
  if (!curso) return;

  const fecha = (iso) => { const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d, 12); };
  const masMeses = (iso, n) => {
    const base = fecha(iso), dia = base.getDate();
    const f = new Date(base.getFullYear(), base.getMonth() + n, 1, 12);
    f.setDate(Math.min(dia, new Date(f.getFullYear(), f.getMonth() + 1, 0).getDate()));
    return f;
  };
  const largo = (d) => d.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
  const corto = (d) => d.toLocaleDateString("es-MX", { day: "numeric", month: "short" }).replace(".", "");
  const pesos = (n) => "$" + Math.round(n).toLocaleString("en-US");

  const fechasPago = Array.from({ length: PAGOS }, (_, i) => masMeses(curso.inicio, i));
  const listaFechas = (fmt) => fechasPago.map(fmt).reduce((t, f, i, a) => (i === 0 ? f : i === a.length - 1 ? `${t} y ${f}` : `${t}, ${f}`), "");
  const valores = {
    nombre: curso.nombre,
    inicio: largo(fecha(curso.inicio)),
    precio: pesos(curso.precio),
    regular: pesos(curso.regular),
    pago_unico: pesos(curso.precio * (1 - DESCUENTO_PAGO_UNICO)),
    cuota: pesos(curso.precio / PAGOS),
    fechas_cortas: `${listaFechas(corto)} de ${fechasPago[PAGOS - 1].getFullYear()}`,
    fechas_largas: listaFechas(largo),
  };
  window.TDD_CURSO = Object.assign({}, curso, valores, { fechasPago });
  document.querySelectorAll("[data-curso]").forEach((el) => {
    const v = valores[el.dataset.curso];
    if (v != null) el.textContent = v;
  });
})();
