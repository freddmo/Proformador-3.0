

using SistemaDeProforma.Entity;

namespace SistemaDeProforma.BLL.Interfaces
{
    public interface IHospitalService
    {
        Task<List<Hospital>> Lista();
        Task<Hospital> Crear(Hospital entidad);
        Task<Hospital> Editar(Hospital entidad);
        Task<bool> Eliminar(int idHospital);
    }
}
