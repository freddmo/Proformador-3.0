using SistemaDeProforma.DAL.DBContext;
using SistemaDeProforma.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace SistemaDeProforma.DAL.Implementacion
{
   
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private readonly DbproformaContext _dbContext;

        public GenericRepository(DbproformaContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<TEntity> Obtener(Expression<Func<TEntity, bool>> filtro)
        {
            try
            {
                TEntity entidad = await _dbContext.Set<TEntity>().FirstOrDefaultAsync(filtro);
                return entidad;
            }
            catch
            {
                throw;
            }
        }

        public async Task<TEntity> Conseguir(Expression<Func<TEntity, bool>> filtroIMS)
        {
            try
            {
                TEntity alma = await _dbContext.Set<TEntity>().FirstOrDefaultAsync(filtroIMS);
                return alma;
            }
            catch
            {
                throw;
            }
        }
        public async Task<TEntity> Adquirir(Expression<Func<TEntity, bool>> filtroGER)
        {
            try
            {
                TEntity ente = await _dbContext.Set<TEntity>().FirstOrDefaultAsync(filtroGER);
                return ente;
            }
            catch
            {
                throw;
            }
        }
        public async Task<TEntity> Crear(TEntity entidad)
        {
            try
            {
                _dbContext.Set<TEntity>().Add(entidad);
                await _dbContext.SaveChangesAsync();
                return entidad;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(TEntity entidad)
        {
            try
            {
                _dbContext.Update(entidad);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(TEntity entidad)
        {
            try
            {
                _dbContext.Remove(entidad);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<IQueryable<TEntity>> Consultar(Expression<Func<TEntity, bool>> filtro = null)
        {
            IQueryable<TEntity> queryEntidad = filtro == null? _dbContext.Set<TEntity>(): _dbContext.Set<TEntity>().Where(filtro);
            return queryEntidad;
        }
        
    }
}
