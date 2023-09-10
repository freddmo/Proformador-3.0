

using SistemaDeProforma.Entity;

namespace SistemaDeProforma.BLL.Interfaces
{
    public interface IMenuService
    {
        Task<List<Menu>> ObtenerMenus(int idUsuario);
    }
}
