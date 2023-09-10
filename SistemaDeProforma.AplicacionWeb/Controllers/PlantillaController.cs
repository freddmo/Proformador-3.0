using Microsoft.AspNetCore.Mvc;

using AutoMapper;
using SistemaDeProforma.AplicacionWeb.Models.ViewModels;
using SistemaDeProforma.BLL.Interfaces;

namespace SistemaDeProforma.AplicacionWeb.Controllers
{
    public class PlantillaController : Controller
    {
        private readonly IMapper _mapper;
        private readonly INegocioService _negocioServicio;
        private readonly IProformaService _proformaServicio;

        public PlantillaController(IMapper mapper, INegocioService negocioServicio, IProformaService proformaServicio)
        {
            _mapper = mapper;
            _negocioServicio = negocioServicio;
            _proformaServicio = proformaServicio;
        }

        public IActionResult EnviarClave(string correo, string clave)
        {
            ViewData["Correo"] = correo;
            ViewData["Clave"] = clave;
            ViewData["Url"] = $"{this.Request.Scheme}://{this.Request.Host}";

            return View();
        }

        public async Task<IActionResult> PDFProforma(string numeroProforma)
        {
            VMProforma vmProforma = _mapper.Map<VMProforma>(await _proformaServicio.DetalleGMC(numeroProforma,"GMC"));
            VMNegocio vmNegocio = _mapper.Map<VMNegocio>(await _negocioServicio.Obtener());

            VMPDFProforma modelo = new VMPDFProforma();

            modelo.negocio = vmNegocio;
            modelo.proforma = vmProforma;
            return View(modelo);
        }

        public async Task<IActionResult> PDFProformaIMS(string numeroProforma)
        {
            VMProforma vmProforma = _mapper.Map<VMProforma>(await _proformaServicio.DetalleIMS(numeroProforma, "IMSUMED"));
            VMNegocio vmNegocio = _mapper.Map<VMNegocio>(await _negocioServicio.Conseguir());

            VMPDFProforma modelo = new VMPDFProforma();

            modelo.negocio = vmNegocio;
            modelo.proforma = vmProforma;
            return View(modelo);
        }

        public async Task<IActionResult> PDFProformaGER(string numeroProforma)
        {
            VMProforma vmProforma = _mapper.Map<VMProforma>(await _proformaServicio.DetalleGER(numeroProforma, "GERMEDIC"));
            VMNegocio vmNegocio = _mapper.Map<VMNegocio>(await _negocioServicio.Adquirir());

            VMPDFProforma modelo = new VMPDFProforma();

            modelo.negocio = vmNegocio;
            modelo.proforma = vmProforma;
            return View(modelo);
        }

        public IActionResult RestablecerClave(string clave)
        {
            ViewData["Clave"] = clave;
            return View();
        }
    }
}
