using Microsoft.AspNetCore.Mvc;

using AutoMapper;
using SistemaDeProforma.AplicacionWeb.Models.ViewModels;
using SistemaDeProforma.AplicacionWeb.Utilidades.Response;
using SistemaDeProforma.BLL.Interfaces;
using SistemaDeProforma.Entity;

using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace SistemaDeProforma.AplicacionWeb.Controllers
{
    [Authorize]
    public class ProformarController : Controller
    {
        private readonly ITipoProformaService _tipoProformaServicio;
        private readonly IProformaService _proformaServicio;
        private readonly IMapper _mapper;
        private readonly IConverter _converter;

        public ProformarController(ITipoProformaService tipoProformaServicio,
            IProformaService proformaServicio,
            IMapper mapper,
            IConverter converter)
        {
            _tipoProformaServicio = tipoProformaServicio;
            _proformaServicio = proformaServicio;
            _mapper = mapper;
            _converter = converter;
        }
        public IActionResult NuevaProforma()
        {
            return View();
        }

        public IActionResult HistorialProforma()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult>ListaTipoProforma()
        {
            List<VMTipoProforma> vmListaTipoProformas = _mapper.Map<List<VMTipoProforma>>(await _tipoProformaServicio.Lista());
            return StatusCode(StatusCodes.Status200OK,vmListaTipoProformas);
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerProductos(string busqueda)
        {
            List<VMProducto> vmListaProductos = _mapper.Map<List<VMProducto>>(await _proformaServicio.ObtenerProductos(busqueda));
            return StatusCode(StatusCodes.Status200OK, vmListaProductos);
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerHospital(string pesquisa)
        {
            List<VMHospital> vmListaHospital = _mapper.Map<List<VMHospital>>(await _proformaServicio.ObtenerHospital(pesquisa));
            return StatusCode(StatusCodes.Status200OK, vmListaHospital);
        }

        [HttpPost]
        public async Task<IActionResult> Registrar([FromBody] VMProforma modelo)
        {
            GenericResponse<VMProforma> gResponse = new GenericResponse<VMProforma>();

            try
            {
                ClaimsPrincipal claimUser = HttpContext.User;

                string idUsuario = claimUser.Claims
                    .Where(c => c.Type == ClaimTypes.NameIdentifier)
                    .Select(c => c.Value).SingleOrDefault();


                modelo.IdUsuario = int.Parse(idUsuario);
                


                Proforma proforma_creada = await _proformaServicio.Registrar(_mapper.Map<Proforma>(modelo));
                modelo = _mapper.Map<VMProforma>(proforma_creada);

                gResponse.Estado = true;
                gResponse.Objeto = modelo;
            }
            catch (Exception ex)
            {
                gResponse.Estado = false;
                gResponse.Mensaje = ex.Message;
            }

            return StatusCode(StatusCodes.Status200OK, gResponse);
        }

        

        [HttpGet]
        public async Task<IActionResult> Historial( string numeroProforma, string nic, string empresa, string fechaInicio, string fechaFin)
        {
            List<VMProforma> vmHistorialProforma = _mapper.Map<List<VMProforma>>(await _proformaServicio.Historial(numeroProforma,nic, empresa, fechaInicio,fechaFin));
            return StatusCode(StatusCodes.Status200OK, vmHistorialProforma);
        }

        public IActionResult MostrarPDFProforma(string numeroProforma)
        {
            string urlPlantillaVista = $"{this.Request.Scheme}://{this.Request.Host}/Plantilla/PDFProforma?numeroProforma={numeroProforma}&empresa=GMC";

            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = new GlobalSettings()
                {
                    
                    PaperSize = PaperKind.A4,
                    Orientation = Orientation.Portrait
                   
                },
                Objects = {
                    new ObjectSettings()
                    {
                        Page = urlPlantillaVista
                    }
                }
                
            };

            var archivoPDF = _converter.Convert(pdf);

            return File(archivoPDF,"application/pdf");
        }

        public IActionResult MostrarPDFProformaIMS(string numeroProforma)
        {
            string urlPlantillaVista = $"{this.Request.Scheme}://{this.Request.Host}/Plantilla/PDFProformaIMS?numeroProforma={numeroProforma}&empresa=IMSUMED";

            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = new GlobalSettings()
                {
                    PaperSize = PaperKind.A4,
                    Orientation = Orientation.Portrait,
                },
                Objects = {
                    new ObjectSettings()
                    {
                        Page = urlPlantillaVista
                        
                    }
                }

            };

            var archivoPDF = _converter.Convert(pdf);

            return File(archivoPDF, "application/pdf");
        }

        public IActionResult MostrarPDFProformaGER(string numeroProforma)
        {
            string urlPlantillaVista = $"{this.Request.Scheme}://{this.Request.Host}/Plantilla/PDFProformaGER?numeroProforma={numeroProforma}&empresa=GERMEDIC";

            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = new GlobalSettings()
                {
                    PaperSize = PaperKind.A4,
                    Orientation = Orientation.Portrait,
                },
                Objects = {
                    new ObjectSettings()
                    {
                        Page = urlPlantillaVista
                    }
                }

            };

            var archivoPDF = _converter.Convert(pdf);

            return File(archivoPDF, "application/pdf");
        }


    }
}
