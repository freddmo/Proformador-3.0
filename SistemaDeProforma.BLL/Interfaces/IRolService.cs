using SistemaDeProforma.Entity;


namespace SistemaDeProforma.BLL.Interfaces
{
    public interface IRolService
    {
        Task<List<Rol>> Lista();
    }
}
