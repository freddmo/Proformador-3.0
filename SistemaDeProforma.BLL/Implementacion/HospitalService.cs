using SistemaDeProforma.BLL.Interfaces;
using SistemaDeProforma.DAL.Interfaces;
using SistemaDeProforma.Entity;

namespace SistemaDeProforma.BLL.Implementacion
{
    public class HospitalService : IHospitalService
    {
        private readonly IGenericRepository<Hospital> _repositorio;

        public HospitalService(IGenericRepository<Hospital> repositorio)
        {
            _repositorio = repositorio;
        }

        public async Task<List<Hospital>> Lista()
        {
            IQueryable<Hospital> query = await _repositorio.Consultar();
            return query.ToList();
        }
        public async Task<Hospital> Crear(Hospital entidad)
        {
            Hospital hospital_existe = await _repositorio.Obtener(c => c.Ruc == entidad.Ruc);

            if (hospital_existe != null)
                throw new TaskCanceledException("El HOSPITAL YA HA SIDO INGRESADO");

            try
            {
                Hospital hospital_creada = await _repositorio.Crear(entidad);
                if( hospital_creada.IdHospital == 0)
                    throw new TaskCanceledException("No se pudo crear el hospital");
                
                return hospital_creada;
            }
            catch
            {
                throw;
            }
        }

        public async Task<Hospital> Editar(Hospital entidad)
        {

            try
            {
                Hospital hospital_encontrado = await _repositorio.Obtener(c => c.IdHospital == entidad.IdHospital);
                hospital_encontrado.Ruc = entidad.Ruc;
                hospital_encontrado.Hospital1 = entidad.Hospital1;
                hospital_encontrado.Direccion = entidad.Direccion;
                hospital_encontrado.Canton = entidad.Canton;
                hospital_encontrado.Activo = entidad.Activo;

                bool respuesta = await _repositorio.Editar(hospital_encontrado);

                if (!respuesta)
                    throw new TaskCanceledException("No se pudo modificar el hospital");

                return hospital_encontrado;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int idHospital)
        {
            Hospital hospital_encontrado = await _repositorio.Obtener(c => c.IdHospital == idHospital);
            if (hospital_encontrado == null)
                throw new TaskCanceledException("El hospital no existe");

            bool respuesta = await _repositorio.Eliminar(hospital_encontrado);

            return respuesta;
        }

        
    }
}
