USE [DMCheckSheet]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 29/03/2025 2:23:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 29/03/2025 2:23:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 29/03/2025 2:23:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 29/03/2025 2:23:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 29/03/2025 2:23:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 29/03/2025 2:23:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 29/03/2025 2:23:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 29/03/2025 2:23:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CheckResults]    Script Date: 29/03/2025 2:23:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CheckResults](
	[ResultId] [int] IDENTITY(1,1) NOT NULL,
	[FormNO] [nvarchar](255) NULL,
	[SheetName] [nvarchar](1000) NULL,
	[DeviceCode] [nvarchar](255) NULL,
	[DeviceName] [nvarchar](1000) NULL,
	[Frequency] [int] NOT NULL,
	[Location] [nvarchar](1000) NULL,
	[Value] [nvarchar](255) NULL,
	[CheckedDate] [datetime2](7) NOT NULL,
	[CheckedBy] [nvarchar](255) NULL,
	[ConfirmedBy] [nvarchar](255) NULL,
	[ApprovedBy] [nvarchar](255) NULL,
	[Note] [nvarchar](1000) NULL,
	[UpdateAt] [datetime2](7) NOT NULL,
	[UpdateBy] [nvarchar](max) NULL,
	[ItemId] [int] NOT NULL,
 CONSTRAINT [PK_CheckResults] PRIMARY KEY CLUSTERED 
(
	[ResultId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CheckSheetDevices]    Script Date: 29/03/2025 2:23:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CheckSheetDevices](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CheckSheetId] [int] NOT NULL,
	[DeviceId] [int] NOT NULL,
 CONSTRAINT [PK_CheckSheetDevices] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CheckSheetItemMST]    Script Date: 29/03/2025 2:23:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CheckSheetItemMST](
	[ItemId] [int] IDENTITY(1,1) NOT NULL,
	[SheetId] [int] NOT NULL,
	[IsRequire] [bit] NOT NULL,
	[DataType] [nvarchar](100) NULL,
	[CreateAt] [datetime2](7) NULL,
	[CreateBy] [nvarchar](200) NULL,
	[UpdateAt] [datetime2](7) NULL,
	[UpdateBy] [nvarchar](200) NULL,
	[Content] [nvarchar](max) NOT NULL,
	[OrderNumber] [int] NULL,
	[ParentId] [int] NULL,
	[CancelFlag] [bit] NOT NULL,
 CONSTRAINT [PK_CheckSheetItemMST] PRIMARY KEY CLUSTERED 
(
	[ItemId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CheckSheetMST]    Script Date: 29/03/2025 2:23:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CheckSheetMST](
	[SheetId] [int] IDENTITY(1,1) NOT NULL,
	[FormNO] [nvarchar](255) NOT NULL,
	[SheetName] [nvarchar](1000) NOT NULL,
	[CreateAt] [datetime2](7) NULL,
	[CreateBy] [nvarchar](200) NULL,
	[UpdateAt] [datetime2](7) NULL,
	[UpdateBy] [nvarchar](200) NULL,
	[CancelFlag] [bit] NOT NULL,
	[SheetCode] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_CheckSheetMST] PRIMARY KEY CLUSTERED 
(
	[SheetId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DeviceMST]    Script Date: 29/03/2025 2:23:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DeviceMST](
	[DeviceId] [int] IDENTITY(1,1) NOT NULL,
	[DeviceCode] [nvarchar](255) NOT NULL,
	[DeviceName] [nvarchar](500) NOT NULL,
	[Location] [nvarchar](500) NOT NULL,
	[Frequency] [int] NOT NULL,
	[CreateAt] [datetime2](7) NULL,
	[CreateBy] [nvarchar](200) NULL,
	[UpdateAt] [datetime2](7) NULL,
	[UpdateBy] [nvarchar](200) NULL,
	[CancelFlag] [bit] NOT NULL,
 CONSTRAINT [PK_DeviceMST] PRIMARY KEY CLUSTERED 
(
	[DeviceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ResultActions]    Script Date: 29/03/2025 2:23:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ResultActions](
	[ActionId] [int] IDENTITY(1,1) NOT NULL,
	[ResultId] [int] NOT NULL,
	[ActionTaken] [nvarchar](500) NOT NULL,
	[ActionDate] [datetime2](7) NOT NULL,
	[ConfirmedBy] [nvarchar](255) NOT NULL,
	[ConfirmedDate] [datetime2](7) NULL,
	[Note] [nvarchar](500) NULL,
 CONSTRAINT [PK_ResultActions] PRIMARY KEY CLUSTERED 
(
	[ActionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250320071244_InitialCreate', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250320071833_Add table', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250322010233_Add CancelFlag Properties', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250324060919_Update name CheckSheets to CheckSheetMST', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250327022849_update checkListItem', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250327032927_update checkListItem cancelFlag', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250327034237_update checkListItem cancelFlagg', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250327082602_update checkListItem cancelFlaggg', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250327084935_update checkListItem cancelFlagggg', N'9.0.2')
GO
SET IDENTITY_INSERT [dbo].[CheckSheetItemMST] ON 

INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (6, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:05:28.0869293' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:05:28.0869303' AS DateTime2), NULL, N'Kiểm tra dầu bôi trơn', 1, NULL, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (7, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:06:30.2232324' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:06:30.2232340' AS DateTime2), NULL, N'Lượng dầu bôi trơn nằm trong vạch H-L', 1, 6, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (8, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:06:54.4821657' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:06:54.4821669' AS DateTime2), NULL, N'Kiểm tra các tay quay', 1, NULL, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (9, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:07:19.9859998' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:07:19.9860009' AS DateTime2), NULL, N'Tay quay nhẹ nhàng và không có âm thanh bất thường', 1, 8, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (10, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:07:40.1673508' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:07:40.1673517' AS DateTime2), NULL, N'Kiểm tra đá', 1, NULL, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (11, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:08:14.6776306' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:08:14.6776319' AS DateTime2), NULL, N'Đá không bị mẻ và không bị lỏng lẻo', 1, 10, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (12, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:08:46.4641239' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:08:46.4641246' AS DateTime2), NULL, N'Kiểm tra bàn từ', 1, NULL, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (13, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:13:05.3367447' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:13:05.3367457' AS DateTime2), NULL, N'Bàn từ không bị via và từ tính không xuất hiện khi bấm nút', 1, 12, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (14, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:13:24.6925438' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:13:24.6925448' AS DateTime2), NULL, N'Kiểm tra dây điện', 1, NULL, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (15, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:13:43.9012485' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:13:43.9012491' AS DateTime2), NULL, N'Không bị mẻ, hở dây điện', 1, 14, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (16, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:14:13.4046953' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:14:13.4046967' AS DateTime2), NULL, N'Limit bảo vệ đá quay', 1, NULL, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (17, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:14:39.8442950' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:14:39.8442956' AS DateTime2), NULL, N'Mở cửa Cover bảo vệ đá quay đang chạy phải dừng', 1, 16, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (18, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:15:05.8096835' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:15:05.8096841' AS DateTime2), NULL, N'Limit bảo vệ an toàn khi đang hoạt động', 1, NULL, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (19, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:15:54.2820896' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:15:54.2820900' AS DateTime2), NULL, N'Khi đang chạy tự động, tắt chế độ nam châm, máy sẽ dừng chạy bàn gá nam châm lại', 1, 18, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (20, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:16:14.8304844' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:16:14.8304848' AS DateTime2), NULL, N'Kiểm tra đèn báo', 1, NULL, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (21, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:18:20.5127315' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:18:20.5127319' AS DateTime2), NULL, N'Bật Magnet -> Đèn xanh sáng. Tắt Magnet -> Đèn đỏ sáng. Đá mài quay -> Đèn vàng sáng, đèn đỏ cảnh báo báo đá quay sáng là OK', 1, 20, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (22, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:18:39.6602432' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:18:39.6602440' AS DateTime2), NULL, N'Kiểm tra nút dừng khẩn cấp', 1, NULL, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (23, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:19:01.4304292' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:19:01.4304296' AS DateTime2), NULL, N'Nút dừng khẩn cấp hoạt động tốt', 1, 22, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (24, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:19:20.9748298' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:19:20.9748301' AS DateTime2), NULL, N'Kiểm tra 5S', 1, NULL, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (25, 4, 1, N'BOOLEAN', CAST(N'2025-03-27T16:20:34.1046711' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:20:34.1046717' AS DateTime2), NULL, N'Máy và khu vực xung quanh máy đã được vệ sinh sạch sẽ chưa?', 1, 24, 0)
SET IDENTITY_INSERT [dbo].[CheckSheetItemMST] OFF
GO
SET IDENTITY_INSERT [dbo].[CheckSheetMST] ON 

INSERT [dbo].[CheckSheetMST] ([SheetId], [FormNO], [SheetName], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag], [SheetCode]) VALUES (4, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', CAST(N'2025-03-27T16:03:58.9253901' AS DateTime2), N'ADMIN', CAST(N'2025-03-27T16:03:58.9253918' AS DateTime2), NULL, 0, N'CS01')
SET IDENTITY_INSERT [dbo].[CheckSheetMST] OFF
GO
SET IDENTITY_INSERT [dbo].[DeviceMST] ON 

INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (1, N'DV01', N'Xe đẩy 1', N'DM', 1, CAST(N'2025-03-22T03:35:01.2180000' AS DateTime2), N'Admin', CAST(N'2025-03-22T10:42:17.4265619' AS DateTime2), NULL, 0)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (2, N'DV02', N'Xe đẩy 02', N'DM', 1, CAST(N'2025-03-22T10:44:27.8844165' AS DateTime2), N'Admin', CAST(N'2025-03-22T10:48:00.2616461' AS DateTime2), N'Hiep', 1)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (3, N'DV03', N'Máy khắc rung điện tử', N'DM', 1, CAST(N'2025-03-24T13:06:49.1210066' AS DateTime2), N'Admin', CAST(N'2025-03-24T13:06:49.1210084' AS DateTime2), NULL, 1)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (4, N'DV03', N'Xe đẩy test', N'DM', 1, CAST(N'2025-03-26T13:11:57.5900138' AS DateTime2), NULL, CAST(N'2025-03-26T13:11:57.5900150' AS DateTime2), NULL, 1)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (5, N'DV04', N'Xe đẩy test', N'DM', 1, CAST(N'2025-03-26T13:12:17.6738319' AS DateTime2), NULL, CAST(N'2025-03-26T13:12:17.6738325' AS DateTime2), NULL, 1)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (6, N'DV02', N'Xe đẩy 2', N'DM', 1, CAST(N'2025-03-26T15:09:45.0038105' AS DateTime2), NULL, CAST(N'2025-03-26T15:09:45.0038114' AS DateTime2), NULL, 0)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (7, N'DV03', N'Xe đẩy 3', N'DM', 1, CAST(N'2025-03-26T15:15:07.8136644' AS DateTime2), NULL, CAST(N'2025-03-26T15:15:07.8136651' AS DateTime2), NULL, 1)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (8, N'DV03', N'Xe đẩy 3', N'DM', 1, CAST(N'2025-03-26T15:17:28.3112247' AS DateTime2), NULL, CAST(N'2025-03-26T15:17:28.3112256' AS DateTime2), NULL, 1)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (9, N'DV04', N'Xe đẩy 4', N'DM', 1, CAST(N'2025-03-26T15:18:03.0853730' AS DateTime2), NULL, CAST(N'2025-03-26T15:18:03.0853734' AS DateTime2), NULL, 1)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (10, N'DV04', N'Xe đẩy 4', N'DM', 1, CAST(N'2025-03-26T15:19:52.1714396' AS DateTime2), NULL, CAST(N'2025-03-26T15:19:52.1714401' AS DateTime2), NULL, 0)
SET IDENTITY_INSERT [dbo].[DeviceMST] OFF
GO
ALTER TABLE [dbo].[CheckResults] ADD  DEFAULT ('0001-01-01T00:00:00.0000000') FOR [UpdateAt]
GO
ALTER TABLE [dbo].[CheckResults] ADD  DEFAULT ((0)) FOR [ItemId]
GO
ALTER TABLE [dbo].[CheckSheetItemMST] ADD  DEFAULT (N'') FOR [Content]
GO
ALTER TABLE [dbo].[CheckSheetItemMST] ADD  DEFAULT (CONVERT([bit],(0))) FOR [CancelFlag]
GO
ALTER TABLE [dbo].[CheckSheetMST] ADD  DEFAULT (CONVERT([bit],(0))) FOR [CancelFlag]
GO
ALTER TABLE [dbo].[CheckSheetMST] ADD  DEFAULT (N'') FOR [SheetCode]
GO
ALTER TABLE [dbo].[DeviceMST] ADD  DEFAULT (CONVERT([bit],(0))) FOR [CancelFlag]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[CheckResults]  WITH CHECK ADD  CONSTRAINT [FK_CheckResults_CheckSheetItemMST_ItemId] FOREIGN KEY([ItemId])
REFERENCES [dbo].[CheckSheetItemMST] ([ItemId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CheckResults] CHECK CONSTRAINT [FK_CheckResults_CheckSheetItemMST_ItemId]
GO
ALTER TABLE [dbo].[CheckSheetDevices]  WITH CHECK ADD  CONSTRAINT [FK_CheckSheetDevices_CheckSheetMST_CheckSheetId] FOREIGN KEY([CheckSheetId])
REFERENCES [dbo].[CheckSheetMST] ([SheetId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CheckSheetDevices] CHECK CONSTRAINT [FK_CheckSheetDevices_CheckSheetMST_CheckSheetId]
GO
ALTER TABLE [dbo].[CheckSheetDevices]  WITH CHECK ADD  CONSTRAINT [FK_CheckSheetDevices_DeviceMST_DeviceId] FOREIGN KEY([DeviceId])
REFERENCES [dbo].[DeviceMST] ([DeviceId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CheckSheetDevices] CHECK CONSTRAINT [FK_CheckSheetDevices_DeviceMST_DeviceId]
GO
ALTER TABLE [dbo].[CheckSheetItemMST]  WITH CHECK ADD  CONSTRAINT [FK_CheckSheetItemMST_CheckSheetMST_SheetId] FOREIGN KEY([SheetId])
REFERENCES [dbo].[CheckSheetMST] ([SheetId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CheckSheetItemMST] CHECK CONSTRAINT [FK_CheckSheetItemMST_CheckSheetMST_SheetId]
GO
ALTER TABLE [dbo].[ResultActions]  WITH CHECK ADD  CONSTRAINT [FK_ResultActions_CheckResults_ResultId] FOREIGN KEY([ResultId])
REFERENCES [dbo].[CheckResults] ([ResultId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ResultActions] CHECK CONSTRAINT [FK_ResultActions_CheckResults_ResultId]
GO
