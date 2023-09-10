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
    public class HospitalesController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IHospitalService _hospitalServicio;

        public HospitalesController(IMapper mapper, IHospitalService hospitalServicio)
        {
            _mapper = mapper;
            _hospitalServicio = hospitalServicio;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Lista()
        {
            List<VMHospital> vMHospital = _mapper.Map<List<VMHospital>>(await _hospitalServicio.Lista());
            return StatusCode(StatusCodes.Status200OK, new {data = vMHospital});
        }

        [HttpPost]
        public async Task<IActionResult> Crear([FromBody]VMHospital modelo)
        {
            GenericResponse<VMHospital> gResponse = new GenericResponse<VMHospital>();

            try
            {
                Hospital hospital_creado = await _hospitalServicio.Crear(_mapper.Map<Hospital>(modelo));
                modelo = _mapper.Map<VMHospital>(hospital_creado);

                gResponse.Estado = true;
                gResponse.Objeto = modelo;
            }
            catch(Exception ex) 
            {
                gResponse.Estado = false;
                gResponse.Mensaje = ex.Message;
            }

            return StatusCode(StatusCodes.Status200OK,gResponse);
        }

        [HttpPut]
        public async Task<IActionResult> Editar([FromBody] VMHospital modelo)
        {
            GenericResponse<VMHospital> gResponse = new GenericResponse<VMHospital>();

            try
            {
                Hospital hospital_editado = await _hospitalServicio.Editar(_mapper.Map<Hospital>(modelo));
                modelo = _mapper.Map<VMHospital>(hospital_editado);

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
        public async Task<IActionResult> Eliminar(int IdHospital)
        {
            GenericResponse<string> gResponse = new GenericResponse<string>();

            try
            {
                

                gResponse.Estado = await _hospitalServicio.Eliminar(IdHospital);
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
