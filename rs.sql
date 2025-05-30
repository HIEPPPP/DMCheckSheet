USE [DMCheckSheet]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 04/05/2025 4:41:19 PM ******/
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
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 04/05/2025 4:41:19 PM ******/
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
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 04/05/2025 4:41:19 PM ******/
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
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 04/05/2025 4:41:19 PM ******/
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
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 04/05/2025 4:41:19 PM ******/
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
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 04/05/2025 4:41:19 PM ******/
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
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 04/05/2025 4:41:19 PM ******/
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
	[FullName] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 04/05/2025 4:41:19 PM ******/
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
/****** Object:  Table [dbo].[CheckResults]    Script Date: 04/05/2025 4:41:19 PM ******/
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
	[SheetCode] [nvarchar](max) NULL,
	[IsConfirmNG] [bit] NOT NULL,
 CONSTRAINT [PK_CheckResults] PRIMARY KEY CLUSTERED 
(
	[ResultId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CheckSheetDevices]    Script Date: 04/05/2025 4:41:19 PM ******/
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
/****** Object:  Table [dbo].[CheckSheetItemMST]    Script Date: 04/05/2025 4:41:19 PM ******/
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
/****** Object:  Table [dbo].[CheckSheetMST]    Script Date: 04/05/2025 4:41:19 PM ******/
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
/****** Object:  Table [dbo].[DeviceMST]    Script Date: 04/05/2025 4:41:19 PM ******/
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
/****** Object:  Table [dbo].[ResultActions]    Script Date: 04/05/2025 4:41:19 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ResultActions](
	[ActionId] [int] IDENTITY(1,1) NOT NULL,
	[ResultId] [int] NOT NULL,
	[ActionTaken] [nvarchar](500) NULL,
	[ActionDate] [datetime2](7) NULL,
	[ConfirmedBy] [nvarchar](255) NULL,
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
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250410022823_add fullName', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250417020349_update relationship checkresult and resultaction', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250417093157_Add field SheetCode table CheckResult', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250418083117_update resultaction', N'9.0.2')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250424044952_add field isconfirmng into checkresult', N'9.0.2')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'097f7879-2b76-42df-83de-38a9fd3ac374', N'Checker', N'CHECKER', NULL)
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'46299873-cec0-427d-b298-2dbd44b3998a', N'Approver', N'APPROVER', NULL)
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'50dee63d-b7d8-420c-8496-f41e10863762', N'Admin', N'ADMIN', NULL)
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'90daedb1-ac08-43fa-86b7-2f22fad66195', N'Confirmer', N'CONFIRMER', NULL)
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES (N'a860d521-3179-4556-bf1a-4cdd2d109cf2', N'Rechecker', N'RECHECKER', NULL)
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'291a82ec-fa14-4682-90d5-f0994dd14747', N'097f7879-2b76-42df-83de-38a9fd3ac374')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'5449bb79-c4b5-4977-984f-bd9298f62950', N'46299873-cec0-427d-b298-2dbd44b3998a')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'537ffb4d-ef7a-4e5a-bd80-2023720bf347', N'50dee63d-b7d8-420c-8496-f41e10863762')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'df7213c5-8329-4135-9197-96cb1db59db9', N'50dee63d-b7d8-420c-8496-f41e10863762')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'ed572b86-4311-4c54-9b62-5a9f8e67b52f', N'90daedb1-ac08-43fa-86b7-2f22fad66195')
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'a759f1dc-2aeb-41cc-bdf0-78d6cfd6eda3', N'a860d521-3179-4556-bf1a-4cdd2d109cf2')
GO
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [FullName]) VALUES (N'291a82ec-fa14-4682-90d5-f0994dd14747', N'checker', N'CHECKER', NULL, NULL, 0, N'AQAAAAIAAYagAAAAEHrMBx80z42JVEgRCNPQwVobgblTERjvbmXcUeFZKrjzbSQbWy+FyQPVwDAeHX4gVA==', N'VMUWQZCZ6LEINNEAQRJRBQXNNSFGYJJC', N'd528c499-41ac-481e-8aac-6540c1107b23', NULL, 0, 0, NULL, 1, 0, N'Đặng Checker')
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [FullName]) VALUES (N'537ffb4d-ef7a-4e5a-bd80-2023720bf347', N'24182', N'24182', NULL, NULL, 0, N'AQAAAAIAAYagAAAAEP8nDy+V8mDKamCVKPP57pA45TMQlOQvaJZ9KH67hZKCY89J+wFQOVdilchRU6GHpQ==', N'VRCGQVKKKFNJTHWQRWBHHEDF27JDN35H', N'85ed9257-ba4a-496a-a46a-294bdea08c39', NULL, 0, 0, NULL, 1, 0, N'Hiệp Đặng Đức')
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [FullName]) VALUES (N'5449bb79-c4b5-4977-984f-bd9298f62950', N'approver', N'APPROVER', NULL, NULL, 0, N'AQAAAAIAAYagAAAAEPFBZROG9xnhx39WCEB1HBNHar81wdz46fQk2eKikET5GqJu4JcUdOCHFrnq2K+Vlw==', N'LBDW4YKOEMULOQIUEJLGZAZ7SHDN4DOK', N'972390ab-0e3d-4fb4-a99c-4eb2d7a4d13a', NULL, 0, 0, NULL, 1, 0, N'Đặng Approver')
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [FullName]) VALUES (N'a759f1dc-2aeb-41cc-bdf0-78d6cfd6eda3', N'rechecker', N'RECHECKER', NULL, NULL, 0, N'AQAAAAIAAYagAAAAEAXUXgkdUZeVfz93Cw5gXMz4dLZG+/oyVf30dEX/9Ps0b4FCSVL/uWF/joab8rZ+Ag==', N'LZAXDKD4PZTMKCSKOGXUC34MTFOGQWCU', N'd2a45e86-6a14-4f0e-97d1-4bb6788bceea', NULL, 0, 0, NULL, 1, 0, N'Đặng Rechecker')
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [FullName]) VALUES (N'df7213c5-8329-4135-9197-96cb1db59db9', N'admin', N'ADMIN', NULL, NULL, 0, N'AQAAAAIAAYagAAAAEIBHLR4cXTPIfDQohMdHbstGIPTVkQS9Tw6Kr9nPStc1X3oDPfJEBYmsJW7XHDvSng==', N'FCRVOFT2TUVH4EQ4E5PT7OFXYQJLUG4I', N'e538d7d4-6694-455e-afb7-05a4e8517a78', NULL, 0, 0, NULL, 1, 0, N'Administrator')
INSERT [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount], [FullName]) VALUES (N'ed572b86-4311-4c54-9b62-5a9f8e67b52f', N'confirmer', N'CONFIRMER', NULL, NULL, 0, N'AQAAAAIAAYagAAAAEJ41qZnfrZ51GxNPry2RO4vmr+SUDMdQjQwUozPKU4lD8A3l/rtZoA7xHf2qOltuhg==', N'5CFCGJFWJ4LPQWIP2YSEHNIRXNBHRQ5L', N'0e88cf6f-6a4e-463c-9744-96091700213a', NULL, 0, 0, NULL, 1, 0, N'Đặng Confirmer')
GO
SET IDENTITY_INSERT [dbo].[CheckResults] ON 

INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1085, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV01', N'Xe đẩy 1', 1, N'DM', N'', CAST(N'2025-04-24T09:06:29.5020000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-04-24T16:06:29.5167995' AS DateTime2), NULL, 49, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1086, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV01', N'Xe đẩy 1', 1, N'DM', N'', CAST(N'2025-04-24T09:06:29.5020000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-04-24T16:06:29.5168012' AS DateTime2), NULL, 50, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1087, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV01', N'Xe đẩy 1', 1, N'DM', N'', CAST(N'2025-04-24T09:06:29.5020000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-04-24T16:06:29.5168014' AS DateTime2), NULL, 51, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1088, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV01', N'Xe đẩy 1', 1, N'DM', N'', CAST(N'2025-04-24T09:06:29.5020000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-04-24T16:06:29.5168016' AS DateTime2), NULL, 52, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1089, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV01', N'Xe đẩy 1', 1, N'DM', N'', CAST(N'2025-04-24T09:06:29.5020000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-04-24T16:06:29.5168017' AS DateTime2), NULL, 53, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1090, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV01', N'Xe đẩy 1', 1, N'DM', N'', CAST(N'2025-04-24T09:06:29.5020000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-04-24T16:06:29.5168019' AS DateTime2), NULL, 54, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1091, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV07', N'Bình rửa mắt', 1, N'DM', N'', CAST(N'2025-04-24T09:08:34.4890000' AS DateTime2), N'admin', N'24182', NULL, N'', CAST(N'2025-04-24T16:08:34.5119050' AS DateTime2), NULL, 49, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1092, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV07', N'Bình rửa mắt', 1, N'DM', N'OK', CAST(N'2025-04-24T09:08:34.4890000' AS DateTime2), N'admin', N'24182', NULL, N'', CAST(N'2025-04-24T16:09:50.2025891' AS DateTime2), N'24182', 50, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1093, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV07', N'Bình rửa mắt', 1, N'DM', N'', CAST(N'2025-04-24T09:08:34.4890000' AS DateTime2), N'admin', N'24182', NULL, N'', CAST(N'2025-04-24T16:08:34.5119072' AS DateTime2), NULL, 51, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1094, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV07', N'Bình rửa mắt', 1, N'DM', N'OK', CAST(N'2025-04-24T09:08:34.4890000' AS DateTime2), N'admin', N'24182', NULL, N'', CAST(N'2025-04-24T16:09:50.4831987' AS DateTime2), N'24182', 52, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1095, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV07', N'Bình rửa mắt', 1, N'DM', N'', CAST(N'2025-04-24T09:08:34.4890000' AS DateTime2), N'admin', N'24182', NULL, N'', CAST(N'2025-04-24T16:08:34.5119074' AS DateTime2), NULL, 53, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1096, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV07', N'Bình rửa mắt', 1, N'DM', N'OK', CAST(N'2025-04-24T09:08:34.4890000' AS DateTime2), N'admin', N'24182', NULL, N'', CAST(N'2025-04-24T16:10:39.6296544' AS DateTime2), N'24182', 54, N'CS01', 1)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1097, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV02', N'Xe đẩy 2', 1, N'DM', N'', CAST(N'2025-04-24T09:11:02.4850000' AS DateTime2), N'24182', N'24182', NULL, N'', CAST(N'2025-04-24T16:11:02.5057618' AS DateTime2), NULL, 49, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1098, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV02', N'Xe đẩy 2', 1, N'DM', N'OK', CAST(N'2025-04-24T09:11:02.4850000' AS DateTime2), N'24182', N'24182', NULL, N'', CAST(N'2025-04-24T16:11:45.8189396' AS DateTime2), N'24182', 50, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1099, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV02', N'Xe đẩy 2', 1, N'DM', N'', CAST(N'2025-04-24T09:11:02.4850000' AS DateTime2), N'24182', N'24182', NULL, N'', CAST(N'2025-04-24T16:11:02.5057636' AS DateTime2), NULL, 51, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1100, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV02', N'Xe đẩy 2', 1, N'DM', N'OK', CAST(N'2025-04-24T09:11:02.4850000' AS DateTime2), N'24182', N'24182', NULL, N'', CAST(N'2025-04-24T16:11:46.0428678' AS DateTime2), N'24182', 52, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1101, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV02', N'Xe đẩy 2', 1, N'DM', N'', CAST(N'2025-04-24T09:11:02.4850000' AS DateTime2), N'24182', N'24182', NULL, N'', CAST(N'2025-04-24T16:11:02.5057639' AS DateTime2), NULL, 53, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1102, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV02', N'Xe đẩy 2', 1, N'DM', N'OK', CAST(N'2025-04-24T09:11:02.4850000' AS DateTime2), N'24182', N'24182', NULL, N'', CAST(N'2025-04-24T16:11:46.4801801' AS DateTime2), N'24182', 54, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1103, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV01', N'Xe đẩy 1', 1, N'DM', N'', CAST(N'2025-05-04T05:49:44.2040000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:49:44.2571556' AS DateTime2), NULL, 49, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1104, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV01', N'Xe đẩy 1', 1, N'DM', N'NG', CAST(N'2025-05-04T05:49:44.2040000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:52:34.3206214' AS DateTime2), NULL, 50, N'CS01', 1)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1105, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV01', N'Xe đẩy 1', 1, N'DM', N'', CAST(N'2025-05-04T05:49:44.2040000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:49:44.2580771' AS DateTime2), NULL, 51, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1106, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV01', N'Xe đẩy 1', 1, N'DM', N'OK', CAST(N'2025-05-04T05:49:44.2040000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:55:24.2190564' AS DateTime2), N'24182', 52, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1107, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV01', N'Xe đẩy 1', 1, N'DM', N'', CAST(N'2025-05-04T05:49:44.2040000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:49:44.2580775' AS DateTime2), NULL, 53, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1108, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV01', N'Xe đẩy 1', 1, N'DM', N'OK', CAST(N'2025-05-04T05:49:44.2040000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:55:24.6832393' AS DateTime2), N'24182', 54, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1109, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV08', N'Device Needed', 3, N'DM', N'', CAST(N'2025-05-04T05:50:02.5990000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:50:02.6170076' AS DateTime2), NULL, 49, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1110, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV08', N'Device Needed', 3, N'DM', N'NG', CAST(N'2025-05-04T05:50:02.5990000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:51:17.3379661' AS DateTime2), NULL, 50, N'CS01', 1)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1111, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV08', N'Device Needed', 3, N'DM', N'', CAST(N'2025-05-04T05:50:02.5990000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:50:02.6170093' AS DateTime2), NULL, 51, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1112, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV08', N'Device Needed', 3, N'DM', N'OK', CAST(N'2025-05-04T05:50:02.5990000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:50:04.5892933' AS DateTime2), N'24182', 52, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1113, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV08', N'Device Needed', 3, N'DM', N'', CAST(N'2025-05-04T05:50:02.5990000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:50:02.6170097' AS DateTime2), NULL, 53, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1114, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV08', N'Device Needed', 3, N'DM', N'OK', CAST(N'2025-05-04T05:50:02.5990000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:50:05.4165501' AS DateTime2), N'24182', 54, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1115, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV02', N'Xe đẩy 2', 1, N'DM', N'', CAST(N'2025-05-04T05:53:23.9420000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:53:23.9572653' AS DateTime2), NULL, 49, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1116, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV02', N'Xe đẩy 2', 1, N'DM', N'OK', CAST(N'2025-05-04T05:53:23.9420000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:53:25.0579318' AS DateTime2), N'24182', 50, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1117, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV02', N'Xe đẩy 2', 1, N'DM', N'', CAST(N'2025-05-04T05:53:23.9420000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:53:23.9572676' AS DateTime2), NULL, 51, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1118, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV02', N'Xe đẩy 2', 1, N'DM', N'', CAST(N'2025-05-04T05:53:23.9420000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:53:23.9572678' AS DateTime2), NULL, 52, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1119, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV02', N'Xe đẩy 2', 1, N'DM', N'', CAST(N'2025-05-04T05:53:23.9420000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:53:23.9572680' AS DateTime2), NULL, 53, N'CS01', 0)
INSERT [dbo].[CheckResults] ([ResultId], [FormNO], [SheetName], [DeviceCode], [DeviceName], [Frequency], [Location], [Value], [CheckedDate], [CheckedBy], [ConfirmedBy], [ApprovedBy], [Note], [UpdateAt], [UpdateBy], [ItemId], [SheetCode], [IsConfirmNG]) VALUES (1120, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', N'DV02', N'Xe đẩy 2', 1, N'DM', N'', CAST(N'2025-05-04T05:53:23.9420000' AS DateTime2), N'24182', NULL, NULL, N'', CAST(N'2025-05-04T12:53:23.9572685' AS DateTime2), NULL, 54, N'CS01', 0)
SET IDENTITY_INSERT [dbo].[CheckResults] OFF
GO
SET IDENTITY_INSERT [dbo].[CheckSheetDevices] ON 

INSERT [dbo].[CheckSheetDevices] ([Id], [CheckSheetId], [DeviceId]) VALUES (5, 4, 1)
INSERT [dbo].[CheckSheetDevices] ([Id], [CheckSheetId], [DeviceId]) VALUES (11, 4, 6)
INSERT [dbo].[CheckSheetDevices] ([Id], [CheckSheetId], [DeviceId]) VALUES (17, 4, 11)
INSERT [dbo].[CheckSheetDevices] ([Id], [CheckSheetId], [DeviceId]) VALUES (18, 4, 15)
INSERT [dbo].[CheckSheetDevices] ([Id], [CheckSheetId], [DeviceId]) VALUES (19, 4, 16)
INSERT [dbo].[CheckSheetDevices] ([Id], [CheckSheetId], [DeviceId]) VALUES (20, 10, 16)
INSERT [dbo].[CheckSheetDevices] ([Id], [CheckSheetId], [DeviceId]) VALUES (21, 10, 17)
INSERT [dbo].[CheckSheetDevices] ([Id], [CheckSheetId], [DeviceId]) VALUES (22, 4, 17)
SET IDENTITY_INSERT [dbo].[CheckSheetDevices] OFF
GO
SET IDENTITY_INSERT [dbo].[CheckSheetItemMST] ON 

INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (49, 4, 1, NULL, CAST(N'2025-04-18T13:32:15.6508848' AS DateTime2), N'', CAST(N'2025-04-18T13:32:15.6508853' AS DateTime2), NULL, N'Kiểm tra dầu bôi trơn', 1, NULL, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (50, 4, 1, N'BOOLEAN', CAST(N'2025-04-18T13:32:52.4382238' AS DateTime2), N'Admin', CAST(N'2025-04-18T13:33:12.0721416' AS DateTime2), N'', N'Lượng dầu bôi trơn nằm trong vạch H-L', 2, 49, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (51, 4, 1, NULL, CAST(N'2025-04-18T13:33:06.7452037' AS DateTime2), N'', CAST(N'2025-04-18T13:33:06.7452047' AS DateTime2), NULL, N'Kiểm tra các tay quay', 3, NULL, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (52, 4, 1, N'BOOLEAN', CAST(N'2025-04-18T13:33:31.2744780' AS DateTime2), N'Admin', CAST(N'2025-04-18T13:33:31.2744787' AS DateTime2), NULL, N'Tay quay nhẹ nhàng và không có âm thanh bất thường.', 4, 51, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (53, 4, 1, NULL, CAST(N'2025-04-18T13:33:59.4566380' AS DateTime2), N'', CAST(N'2025-04-18T13:33:59.4566388' AS DateTime2), NULL, N'Kiểm tra đá', 5, NULL, 0)
INSERT [dbo].[CheckSheetItemMST] ([ItemId], [SheetId], [IsRequire], [DataType], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [Content], [OrderNumber], [ParentId], [CancelFlag]) VALUES (54, 4, 1, N'BOOLEAN', CAST(N'2025-04-18T13:34:21.8266842' AS DateTime2), N'Admin', CAST(N'2025-04-18T13:34:21.8266845' AS DateTime2), NULL, N'Đá không bị mẻ và không bị lỏng lẻo.', 6, 53, 0)
SET IDENTITY_INSERT [dbo].[CheckSheetItemMST] OFF
GO
SET IDENTITY_INSERT [dbo].[CheckSheetMST] ON 

INSERT [dbo].[CheckSheetMST] ([SheetId], [FormNO], [SheetName], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag], [SheetCode]) VALUES (4, N'FCS01', N'CHECK SHEET HÀNG NGÀY MÁY MÀI PHẲNG', CAST(N'2025-03-27T16:03:58.9253901' AS DateTime2), N'ADMIN', CAST(N'2025-04-01T09:58:03.9578505' AS DateTime2), NULL, 0, N'CS01')
INSERT [dbo].[CheckSheetMST] ([SheetId], [FormNO], [SheetName], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag], [SheetCode]) VALUES (5, N'FCS02', N'KIỂM TRA: ĐẦU GIỜ MÁY ĐO KEYENCE LM-1000', CAST(N'2025-03-31T10:16:58.3811149' AS DateTime2), NULL, CAST(N'2025-03-31T15:55:37.4772596' AS DateTime2), NULL, 0, N'CS02')
INSERT [dbo].[CheckSheetMST] ([SheetId], [FormNO], [SheetName], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag], [SheetCode]) VALUES (6, N'FCS03', N'KIỂM TRA: ĐẦU GIỜ MÁY ĐO KEYENCE LM-1000', CAST(N'2025-03-31T10:41:37.2033212' AS DateTime2), NULL, CAST(N'2025-03-31T13:47:08.2620127' AS DateTime2), NULL, 0, N'CS03')
INSERT [dbo].[CheckSheetMST] ([SheetId], [FormNO], [SheetName], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag], [SheetCode]) VALUES (7, N'FFFFF', N'ffff', CAST(N'2025-04-01T09:37:22.0437622' AS DateTime2), NULL, CAST(N'2025-04-01T09:37:22.0437629' AS DateTime2), NULL, 1, N'ffff')
INSERT [dbo].[CheckSheetMST] ([SheetId], [FormNO], [SheetName], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag], [SheetCode]) VALUES (8, N'AAA', N'AAA', CAST(N'2025-04-01T09:56:06.4820431' AS DateTime2), NULL, CAST(N'2025-04-01T09:56:06.4820437' AS DateTime2), NULL, 1, N'AAA')
INSERT [dbo].[CheckSheetMST] ([SheetId], [FormNO], [SheetName], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag], [SheetCode]) VALUES (9, N'aaa', N'aa', CAST(N'2025-04-01T09:58:08.9221369' AS DateTime2), NULL, CAST(N'2025-04-01T09:58:08.9221375' AS DateTime2), NULL, 1, N'aa')
INSERT [dbo].[CheckSheetMST] ([SheetId], [FormNO], [SheetName], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag], [SheetCode]) VALUES (10, N'FCS04', N'CHECK SHEET HÀNG NGÀY BÌNH RỬA MẮT', CAST(N'2025-04-15T09:54:57.8324043' AS DateTime2), NULL, CAST(N'2025-04-15T09:54:57.8324046' AS DateTime2), NULL, 0, N'CS04')
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
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (10, N'DV04', N'Xe đẩy 4', N'DM', 1, CAST(N'2025-03-26T15:19:52.1714396' AS DateTime2), NULL, CAST(N'2025-03-26T15:19:52.1714401' AS DateTime2), NULL, 1)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (11, N'DV03', N'Xe đẩy 3', N'DM', 1, CAST(N'2025-04-04T14:48:12.3908756' AS DateTime2), NULL, CAST(N'2025-04-04T14:48:12.3908770' AS DateTime2), N'Admin', 0)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (12, N'rest', N'rest', N'1', 1, CAST(N'2025-04-06T13:15:51.5001021' AS DateTime2), NULL, CAST(N'2025-04-06T13:15:51.5001030' AS DateTime2), NULL, 1)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (13, N'DV04', N'Xe đẩy 04', N'DM', 1, CAST(N'2025-04-15T09:44:15.3942944' AS DateTime2), NULL, CAST(N'2025-04-15T09:44:15.3942956' AS DateTime2), NULL, 0)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (14, N'DV05', N'Xe đẩy 05', N'DM', 1, CAST(N'2025-04-15T09:44:35.9958474' AS DateTime2), NULL, CAST(N'2025-04-15T09:44:35.9958479' AS DateTime2), NULL, 0)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (15, N'DV06', N'Xe đẩy 06', N'DM', 1, CAST(N'2025-04-15T09:44:53.2397570' AS DateTime2), NULL, CAST(N'2025-04-15T09:44:53.2397573' AS DateTime2), NULL, 0)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (16, N'DV07', N'Bình rửa mắt', N'DM', 1, CAST(N'2025-04-15T09:54:01.6112499' AS DateTime2), NULL, CAST(N'2025-04-15T09:54:01.6112503' AS DateTime2), NULL, 0)
INSERT [dbo].[DeviceMST] ([DeviceId], [DeviceCode], [DeviceName], [Location], [Frequency], [CreateAt], [CreateBy], [UpdateAt], [UpdateBy], [CancelFlag]) VALUES (17, N'DV08', N'Device Needed', N'DM', 3, CAST(N'2025-04-24T10:17:45.4073827' AS DateTime2), NULL, CAST(N'2025-04-24T10:17:45.4073840' AS DateTime2), NULL, 0)
SET IDENTITY_INSERT [dbo].[DeviceMST] OFF
GO
SET IDENTITY_INSERT [dbo].[ResultActions] ON 

INSERT [dbo].[ResultActions] ([ActionId], [ResultId], [ActionTaken], [ActionDate], [ConfirmedBy], [ConfirmedDate], [Note]) VALUES (56, 1096, N'aaaaa', CAST(N'2025-04-24T00:00:00.0000000' AS DateTime2), N'24182', CAST(N'2025-04-24T00:00:00.0000000' AS DateTime2), N'aaaaaa')
INSERT [dbo].[ResultActions] ([ActionId], [ResultId], [ActionTaken], [ActionDate], [ConfirmedBy], [ConfirmedDate], [Note]) VALUES (57, 1110, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[ResultActions] ([ActionId], [ResultId], [ActionTaken], [ActionDate], [ConfirmedBy], [ConfirmedDate], [Note]) VALUES (58, 1104, NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[ResultActions] OFF
GO
ALTER TABLE [dbo].[CheckResults] ADD  DEFAULT ('0001-01-01T00:00:00.0000000') FOR [UpdateAt]
GO
ALTER TABLE [dbo].[CheckResults] ADD  DEFAULT ((0)) FOR [ItemId]
GO
ALTER TABLE [dbo].[CheckResults] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsConfirmNG]
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
