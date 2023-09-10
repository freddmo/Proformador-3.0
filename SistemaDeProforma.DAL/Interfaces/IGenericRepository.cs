

using System.Linq.Expressions;

namespace SistemaDeProforma.DAL.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        Task<TEntity> Obtener(Expression<Func<TEntity, bool>> filtro);

        Task<TEntity> Conseguir(Expression<Func<TEntity, bool>> filtroIMS);

        Task<TEntity> Adquirir(Expression<Func<TEntity, bool>> filtroGER);

        Task<TEntity> Crear(TEntity entidad);
        Task<bool>Editar(TEntity entidad);
        Task<bool> Eliminar(TEntity entidad);
        Task<IQueryable<TEntity>> Consultar(Expression<Func<TEntity, bool>> filtro = null);
    }
}
