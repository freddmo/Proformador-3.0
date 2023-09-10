using Microsoft.AspNetCore.Mvc;

using AutoMapper;
using Newtonsoft.Json;
using SistemaDeProforma.AplicacionWeb.Models.ViewModels;
using SistemaDeProforma.AplicacionWeb.Utilidades.Response;
using SistemaDeProforma.BLL.Interfaces;
using SistemaDeProforma.Entity;
using SistemaDeProforma.BLL.Implementacion;
using Microsoft.AspNetCore.Authorization;

namespace SistemaDeProforma.AplicacionWeb.Controllers
{
    [Authorize]
    public class MedicamentosController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IProductoService _productoServicio;

        public MedicamentosController(IMapper mapper, IProductoService productoServicio)
        {
            _mapper = mapper;
            _productoServicio = productoServicio;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Lista()
        {
            List<VMProducto> vMProducto = _mapper.Map<List<VMProducto>>(await _productoServicio.Lista());
            return StatusCode(StatusCodes.Status200OK, new { data = vMProducto });
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody] VMProducto modelo)
        {
            GenericResponse<VMProducto> gResponse = new GenericResponse<VMProducto>();

            try
            {
                Producto producto_creado = await _productoServicio.Crear(_mapper.Map<Producto>(modelo));
                modelo = _mapper.Map<VMProducto>(producto_creado);

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

        [HttpPut]
        public async Task<IActionResult> Editar([FromBody] VMProducto modelo)
        {
            GenericResponse<VMProducto> gResponse = new GenericResponse<VMProducto>();

            try
            {
                Producto producto_editado = await _productoServicio.Editar(_mapper.Map<Producto>(modelo));
                modelo = _mapper.Map<VMProducto>(producto_editado);

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

        [HttpDelete]
        public async Task<IActionResult> Eliminar(int IdProducto)
        {
            GenericResponse<string> gResponse = new GenericResponse<string>();

            try
            {


                gResponse.Estado = await _productoServicio.Eliminar(IdProducto);
            }
            catch (Exception ex)
            {
                gResponse.Estado = false;
                gResponse.Mensaje = ex.Message;
            }

            return StatusCode(StatusCodes.Status200OK, gResponse);
        }
    }
}
