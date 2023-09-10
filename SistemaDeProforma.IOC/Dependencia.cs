
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SistemaDeProforma.DAL.DBContext;
using Microsoft.EntityFrameworkCore;

using SistemaDeProforma.DAL.Interfaces;
using SistemaDeProforma.DAL.Implementacion;
using SistemaDeProforma.BLL.Interfaces;
using SistemaDeProforma.BLL.Implementacion;


namespace SistemaDeProforma.IOC
{
    public static class Dependencia
    {
        public static void InyectarDependencia(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddDbContext<DbproformaContext>(options =>{
                options.UseSqlServer(Configuration.GetConnectionString("CadenaSQL"));
            });

            services.AddTransient(typeof(IGenericRepository<>),typeof(GenericRepository<>));
            services.AddScoped<IProformaRepository,ProformaRepository>();

            services.AddScoped<ICorreoService, CorreoService>();
            services.AddScoped<IFireBaseService, FireBaseService>();

            services.AddScoped<IUtilidadesService, UtilidadeService>();
            services.AddScoped<IRolService, RolService>();

            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<INegocioService, NegocioService>();
            services.AddScoped<IHospitalService, HospitalService>();
            services.AddScoped<IProductoService, ProductoService>();

            services.AddScoped<ITipoProformaService, TipoProformaService>();
            services.AddScoped<IProformaService, ProformaService>();

            services.AddScoped<IMenuService, MenuService>();
        }
    }
}
