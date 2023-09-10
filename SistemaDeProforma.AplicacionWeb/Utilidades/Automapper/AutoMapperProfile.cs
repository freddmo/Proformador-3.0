using SistemaDeProforma.AplicacionWeb.Models.ViewModels;
using SistemaDeProforma.Entity;
using System.Globalization;
using AutoMapper;

namespace SistemaDeProforma.AplicacionWeb.Utilidades.Automapper
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            #region Rol
            CreateMap<Rol,VMRol>().ReverseMap();
            #endregion

            #region Usuario
            CreateMap<Usuario, VMUsuario>()
                .ForMember(destino =>
                destino.Activo,
                opt => opt.MapFrom(origen => origen.Activo == true ? 1 : 0)
                )
                .ForMember(destino =>
                destino.NombreRol,
                opt => opt.MapFrom(origen => origen.IdRolNavigation.Descripcion)
                );

            CreateMap<VMUsuario, Usuario>()
                .ForMember(destino =>
                destino.Activo,
                opt => opt.MapFrom(origen => origen.Activo == 1 ? true:false)
                )
                .ForMember(destino =>
                destino.IdRolNavigation,
                opt => opt.Ignore()
                );
            #endregion

            #region Negocio
            CreateMap<Negocio, VMNegocio>().ReverseMap();
            #endregion

            #region Hospital
            CreateMap<Hospital, VMHospital>()
                .ForMember(destino =>
                destino.Activo,
                opt => opt.MapFrom(origen => origen.Activo == true ? 1 : 0)
                );

            CreateMap<VMHospital, Hospital>()
                .ForMember(destino =>
                destino.Activo,
                opt => opt.MapFrom(origen => origen.Activo == 1 ? true : false)
                );
            #endregion

            #region Productos
            CreateMap<Producto, VMProducto>()
                .ForMember(destino =>
                destino.Activo,
                opt => opt.MapFrom(origen => origen.Activo == true ? 1 : 0)
                )
                .ForMember(destino =>
                destino.Iva,
                opt => opt.MapFrom(origen => Convert.ToString(origen.Iva.Value, new CultureInfo("en-US")))
                );
            //cambiar el codigo del iva porque ahora sera decimal
            CreateMap<VMProducto, Producto>()
                .ForMember(destino =>
                destino.Activo,
                opt => opt.MapFrom(origen => origen.Activo == 1 ? true : false)
                )
                .ForMember(destino =>
                destino.Iva,
                opt => opt.MapFrom(origen => Convert.ToDecimal(origen.Iva, new CultureInfo("en-US")))
                );
            #endregion

            #region TipoProforma
            CreateMap<TipoProforma, VMTipoProforma>().ReverseMap();
            #endregion

            #region Proforma
            CreateMap<Proforma, VMProforma>()
                .ForMember(destino =>
                destino.TipoProforma,
                opt => opt.MapFrom(origen => origen.IdTipoProformaNavigation.Descripcion)
                )
                .ForMember(destino =>
                destino.Usuario,
                opt => opt.MapFrom(origen => origen.IdUsuarioNavigation.Nombre)
                )
                .ForMember(destino =>
                 destino.SubtotalGmc,
                opt => opt.MapFrom(origen => Convert.ToString(origen.SubtotalGmc.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.SubtotalIms,
                opt => opt.MapFrom(origen => Convert.ToString(origen.SubtotalIms.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.SubtotalGer,
                opt => opt.MapFrom(origen => Convert.ToString(origen.SubtotalGer.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.IvaTotalGMC,
                opt => opt.MapFrom(origen => Convert.ToString(origen.IvaTotalGMC.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.IvaTotalIMS,
                opt => opt.MapFrom(origen => Convert.ToString(origen.IvaTotalIMS.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.IvaTotalGER,
                opt => opt.MapFrom(origen => Convert.ToString(origen.IvaTotalGER.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.TotalGmc,
                opt => opt.MapFrom(origen => Convert.ToString(origen.TotalGmc.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.TotalIms,
                opt => opt.MapFrom(origen => Convert.ToString(origen.TotalIms.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.TotalGer,
                opt => opt.MapFrom(origen => Convert.ToString(origen.TotalGer.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.FechaRegistro,
                opt => opt.MapFrom(origen => origen.FechaRegistro.Value.ToString("dd/MM/yyyy"))
                );


            CreateMap<VMProforma, Proforma>()
            .ForMember(destino =>
             destino.SubtotalGmc,
            opt => opt.MapFrom(origen => Convert.ToDecimal(origen.SubtotalGmc, new CultureInfo("en-US")))
            )
            .ForMember(destino =>
             destino.SubtotalIms,
            opt => opt.MapFrom(origen => Convert.ToDecimal(origen.SubtotalIms, new CultureInfo("en-US")))
            )
            .ForMember(destino =>
             destino.SubtotalGer,
            opt => opt.MapFrom(origen => Convert.ToDecimal(origen.SubtotalGer, new CultureInfo("en-US")))
            )
            .ForMember(destino =>
             destino.IvaTotalGMC,
            opt => opt.MapFrom(origen => Convert.ToDecimal(origen.IvaTotalGMC, new CultureInfo("en-US")))
            )
            .ForMember(destino =>
             destino.IvaTotalIMS,
            opt => opt.MapFrom(origen => Convert.ToDecimal(origen.IvaTotalIMS, new CultureInfo("en-US")))
            )
            .ForMember(destino =>
             destino.IvaTotalGER,
            opt => opt.MapFrom(origen => Convert.ToDecimal(origen.IvaTotalGER, new CultureInfo("en-US")))
            )
            .ForMember(destino =>
             destino.TotalGmc,
            opt => opt.MapFrom(origen => Convert.ToDecimal(origen.TotalGmc, new CultureInfo("en-US")))
            )
            .ForMember(destino =>
             destino.TotalIms,
            opt => opt.MapFrom(origen => Convert.ToDecimal(origen.TotalIms, new CultureInfo("en-US")))
            )
            .ForMember(destino =>
             destino.TotalGer,
            opt => opt.MapFrom(origen => Convert.ToDecimal(origen.TotalGer, new CultureInfo("en-US")))
            );
            #endregion

            #region DetalleProductoProforma
            CreateMap<DetalleProductoProforma, VMDetalleProductoProforma>()
                .ForMember(destino =>
                 destino.PrecioGmc,
                opt => opt.MapFrom(origen => Convert.ToString(origen.PrecioGmc.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.PrecioIms,
                opt => opt.MapFrom(origen => Convert.ToString(origen.PrecioIms.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.PrecioGer,
                opt => opt.MapFrom(origen => Convert.ToString(origen.PrecioGer.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.TotalUgmc,
                opt => opt.MapFrom(origen => Convert.ToString(origen.TotalUgmc.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.TotalUims,
                opt => opt.MapFrom(origen => Convert.ToString(origen.TotalUims.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.TotalUger,
                opt => opt.MapFrom(origen => Convert.ToString(origen.TotalUger.Value, new CultureInfo("en-US")))
                );

            CreateMap<VMDetalleProductoProforma, DetalleProductoProforma>()
               .ForMember(destino =>
                destino.PrecioGmc,
               opt => opt.MapFrom(origen => Convert.ToDecimal(origen.PrecioGmc, new CultureInfo("en-US")))
               )
               .ForMember(destino =>
                destino.PrecioIms,
               opt => opt.MapFrom(origen => Convert.ToDecimal(origen.PrecioIms, new CultureInfo("en-US")))
               )
               .ForMember(destino =>
                destino.PrecioGer,
               opt => opt.MapFrom(origen => Convert.ToDecimal(origen.PrecioGer, new CultureInfo("en-US")))
               )
               .ForMember(destino =>
                destino.TotalUgmc,
               opt => opt.MapFrom(origen => Convert.ToDecimal(origen.TotalUgmc, new CultureInfo("en-US")))
               )
               .ForMember(destino =>
                destino.TotalUims,
               opt => opt.MapFrom(origen => Convert.ToDecimal(origen.TotalUims, new CultureInfo("en-US")))
               )
               .ForMember(destino =>
                destino.TotalUger,
               opt => opt.MapFrom(origen => Convert.ToDecimal(origen.TotalUger, new CultureInfo("en-US")))
               );

            CreateMap<DetalleProductoProforma, VMreporteProforma>()
                .ForMember(destino =>
                destino.FechaRegistro,
                opt => opt.MapFrom(origen => origen.IdProformaNavigation.FechaRegistro.Value.ToString("dd/MM/yyyy"))
                )
                .ForMember(destino =>
                destino.NumeroProforma,
                opt => opt.MapFrom(origen => origen.IdProformaNavigation.NumeroProforma)
                )
                .ForMember(destino =>
                destino.TipoProforma,
                opt => opt.MapFrom(origen => origen.IdProformaNavigation.IdTipoProformaNavigation.Descripcion)
                )
                .ForMember(destino =>
                destino.RazonSocial,
                opt => opt.MapFrom(origen => origen.IdProformaNavigation.RazonSocial)
                )
                .ForMember(destino =>
                 destino.TotalGMC,
                opt => opt.MapFrom(origen => Convert.ToString(origen.IdProformaNavigation.TotalGmc.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.TotalIMSUMED,
                opt => opt.MapFrom(origen => Convert.ToString(origen.IdProformaNavigation.TotalIms.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                 destino.TotalGERMEDIC,
                opt => opt.MapFrom(origen => Convert.ToString(origen.IdProformaNavigation.TotalGer.Value, new CultureInfo("en-US")))
                )
                .ForMember(destino =>
                destino.Producto,
                opt => opt.MapFrom(origen => origen.Dc)
                )
                .ForMember(destino =>
                destino.PrecioGMC,
               opt => opt.MapFrom(origen => Convert.ToString(origen.PrecioGmc, new CultureInfo("en-US")))
               )
               .ForMember(destino =>
                destino.PrecioIMSUMED,
               opt => opt.MapFrom(origen => Convert.ToString(origen.PrecioIms, new CultureInfo("en-US")))
               )
               .ForMember(destino =>
                destino.PrecioGERMEDIC,
               opt => opt.MapFrom(origen => Convert.ToString(origen.PrecioGer, new CultureInfo("en-US")))
               )
               .ForMember(destino =>
                destino.TotalUnitarioGMC,
               opt => opt.MapFrom(origen => Convert.ToString(origen.TotalUgmc, new CultureInfo("en-US")))
               )
               .ForMember(destino =>
                destino.TotalUnitarioIMS,
               opt => opt.MapFrom(origen => Convert.ToString(origen.TotalUims, new CultureInfo("en-US")))
               )
               .ForMember(destino =>
                destino.TotalUnitarioGER,
               opt => opt.MapFrom(origen => Convert.ToString(origen.TotalUger, new CultureInfo("en-US")))
               );
            #endregion

            #region Menu
            CreateMap<Menu, VMMenu>()
                .ForMember(
                destino => destino.SubMenus,
                opt => opt.MapFrom(origen => origen.InverseIdMenuPadreNavigation)
                );
            #endregion

           
        }
    }
}
