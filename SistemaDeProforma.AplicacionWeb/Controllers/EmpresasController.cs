using Microsoft.AspNetCore.Mvc;

using AutoMapper;
using Newtonsoft.Json;
using SistemaDeProforma.AplicacionWeb.Models.ViewModels;
using SistemaDeProforma.AplicacionWeb.Utilidades.Response;
using SistemaDeProforma.BLL.Interfaces;
using SistemaDeProforma.Entity;
using Microsoft.AspNetCore.Authorization;

namespace SistemaDeProforma.AplicacionWeb.Controllers
{
    [Authorize]
    public class EmpresasController : Controller
    {
        private readonly IMapper _mapper;
        private readonly INegocioService _negocioService;

        public EmpresasController(IMapper mapper, INegocioService negocioService)
        {
            _mapper = mapper;
            _negocioService = negocioService;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            GenericResponse<VMNegocio> gResponse = new GenericResponse<VMNegocio>();

            try
            {
                VMNegocio vmNegocio = _mapper.Map<VMNegocio>(await _negocioService.Obtener());

                gResponse.Estado = true;
                gResponse.Objeto = vmNegocio;
            }
            catch(Exception ex)
            {
                gResponse.Estado = false;
                gResponse.Mensaje = ex.Message;
            }

            return StatusCode(StatusCodes.Status200OK, gResponse);
        }

        [HttpGet]
        public async Task<IActionResult> Conseguir()
        {
            GenericResponse<VMNegocio> imsResponse = new GenericResponse<VMNegocio>();

            try
            {
                VMNegocio imsNegocio = _mapper.Map<VMNegocio>(await _negocioService.Conseguir());

                imsResponse.Estado = true;
                imsResponse.Objeto = imsNegocio;
            }
            catch (Exception ex)
            {
                imsResponse.Estado = false;
                imsResponse.Mensaje = ex.Message;
            }

            return StatusCode(StatusCodes.Status200OK, imsResponse);
        }
        
        [HttpGet]
        public async Task<IActionResult> Adquirir()
        {
            GenericResponse<VMNegocio> gerResponse = new GenericResponse<VMNegocio>();

            try
            {
                VMNegocio gerNegocio = _mapper.Map<VMNegocio>(await _negocioService.Adquirir());

                gerResponse.Estado = true;
                gerResponse.Objeto = gerNegocio;
            }
            catch (Exception ex)
            {
                gerResponse.Estado = false;
                gerResponse.Mensaje = ex.Message;
            }

            return StatusCode(StatusCodes.Status200OK, gerResponse);
        }

        [HttpPost]
        public async Task<IActionResult> GuardarCambios([FromForm]IFormFile logo, [FromForm]string modelo)
        {
            GenericResponse<VMNegocio> gResponse = new GenericResponse<VMNegocio>();

            try
            {
                VMNegocio vmNegocio = JsonConvert.DeserializeObject<VMNegocio>(modelo);

                string nombreLogo = "";
                Stream logoStream = null;

                if(logo != null)
                {
                    string nombre_en_codigo = Guid.NewGuid().ToString("N");
                    string extension = Path.GetExtension(logo.FileName);
                    nombreLogo = string.Concat(nombre_en_codigo, extension);
                    logoStream = logo.OpenReadStream();
                }

                Negocio negocio_editado = await _negocioService.GuardarCambios(_mapper.Map<Negocio>(vmNegocio)
                    , logoStream, nombreLogo);

                vmNegocio = _mapper.Map<VMNegocio>(negocio_editado);

                gResponse.Estado = true;
                gResponse.Objeto = vmNegocio;
            }
            catch (Exception ex)
            {
                gResponse.Estado = false;
                gResponse.Mensaje = ex.Message;
            }

            return StatusCode(StatusCodes.Status200OK, gResponse);
        }

        [HttpPost]
        public async Task<IActionResult> GCIMS([FromForm] IFormFile logo, [FromForm] string pauta)
        {
            GenericResponse<VMNegocio> imsResponse = new GenericResponse<VMNegocio>();

            try
            {
                VMNegocio imsNegocio = JsonConvert.DeserializeObject<VMNegocio>(pauta);

                string nombreLogo = "";
                Stream logoStream = null;

                if (logo != null)
                {
                    string nombre_en_cims = Guid.NewGuid().ToString("N");
                    string extension_ims = Path.GetExtension(logo.FileName);
                    nombreLogo = string.Concat(nombre_en_cims, extension_ims);
                    logoStream = logo.OpenReadStream();
                }

                Negocio ims_negocio_editado = await _negocioService.GCIMS(_mapper.Map<Negocio>(imsNegocio)
                    , logoStream, nombreLogo);

                imsNegocio = _mapper.Map<VMNegocio>(ims_negocio_editado);

                imsResponse.Estado = true;
                imsResponse.Objeto = imsNegocio;
            }
            catch (Exception ex)
            {
                imsResponse.Estado = false;
                imsResponse.Mensaje = ex.Message;
            }

            return StatusCode(StatusCodes.Status200OK, imsResponse);
        }

        [HttpPost]
        public async Task<IActionResult> GCGER([FromForm] IFormFile logo, [FromForm] string patron)
        {
            GenericResponse<VMNegocio> gerResponse = new GenericResponse<VMNegocio>();

            try
            {
                VMNegocio gerNegocio = JsonConvert.DeserializeObject<VMNegocio>(patron);

                string nombreLogo = "";
                Stream logoStream = null;

                if (logo != null)
                {
                    string nombre_en_cger = Guid.NewGuid().ToString("N");
                    string extension_ger = Path.GetExtension(logo.FileName);
                    nombreLogo = string.Concat(nombre_en_cger, extension_ger);
                    logoStream = logo.OpenReadStream();
                }

                Negocio ger_negocio_editado = await _negocioService.GCGER(_mapper.Map<Negocio>(gerNegocio)
                    , logoStream, nombreLogo);

                gerNegocio = _mapper.Map<VMNegocio>(ger_negocio_editado);

                gerResponse.Estado = true;
                gerResponse.Objeto = gerNegocio;
            }
            catch (Exception ex)
            {
                gerResponse.Estado = false;
                gerResponse.Mensaje = ex.Message;
            }

            return StatusCode(StatusCodes.Status200OK, gerResponse);
        }
    }
}
