using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMCheckSheetAPI.Migrations
{
    /// <inheritdoc />
    public partial class Addtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckSheetDevice_CheckSheetMST_CheckSheetId",
                table: "CheckSheetDevice");

            migrationBuilder.DropForeignKey(
                name: "FK_CheckSheetDevice_DeviceMST_DeviceId",
                table: "CheckSheetDevice");

            migrationBuilder.DropForeignKey(
                name: "FK_CheckSheetItemMST_CheckSheetMST_SheetId",
                table: "CheckSheetItemMST");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CheckSheetMST",
                table: "CheckSheetMST");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CheckSheetDevice",
                table: "CheckSheetDevice");

            migrationBuilder.RenameTable(
                name: "CheckSheetMST",
                newName: "CheckSheets");

            migrationBuilder.RenameTable(
                name: "CheckSheetDevice",
                newName: "CheckSheetDevices");

            migrationBuilder.RenameIndex(
                name: "IX_CheckSheetDevice_DeviceId",
                table: "CheckSheetDevices",
                newName: "IX_CheckSheetDevices_DeviceId");

            migrationBuilder.RenameIndex(
                name: "IX_CheckSheetDevice_CheckSheetId",
                table: "CheckSheetDevices",
                newName: "IX_CheckSheetDevices_CheckSheetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CheckSheets",
                table: "CheckSheets",
                column: "SheetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CheckSheetDevices",
                table: "CheckSheetDevices",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "CheckResults",
                columns: table => new
                {
                    ResultId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FormNO = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    SheetName = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    DeviceCode = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    DeviceName = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Frequency = table.Column<int>(type: "int", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ItemTitle = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ItemName = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    IsRequire = table.Column<bool>(type: "bit", nullable: false),
                    DataType = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Value = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    CheckedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CheckedBy = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ConfirmedBy = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ApprovedBy = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Note = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheckResults", x => x.ResultId);
                });

            migrationBuilder.CreateTable(
                name: "ResultActions",
                columns: table => new
                {
                    ActionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResultId = table.Column<int>(type: "int", nullable: false),
                    ActionTaken = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ActionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ConfirmedBy = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ConfirmedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResultActions", x => x.ActionId);
                    table.ForeignKey(
                        name: "FK_ResultActions_CheckResults_ResultId",
                        column: x => x.ResultId,
                        principalTable: "CheckResults",
                        principalColumn: "ResultId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ResultActions_ResultId",
                table: "ResultActions",
                column: "ResultId");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckSheetDevices_CheckSheets_CheckSheetId",
                table: "CheckSheetDevices",
                column: "CheckSheetId",
                principalTable: "CheckSheets",
                principalColumn: "SheetId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CheckSheetDevices_DeviceMST_DeviceId",
                table: "CheckSheetDevices",
                column: "DeviceId",
                principalTable: "DeviceMST",
                principalColumn: "DeviceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CheckSheetItemMST_CheckSheets_SheetId",
                table: "CheckSheetItemMST",
                column: "SheetId",
                principalTable: "CheckSheets",
                principalColumn: "SheetId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckSheetDevices_CheckSheets_CheckSheetId",
                table: "CheckSheetDevices");

            migrationBuilder.DropForeignKey(
                name: "FK_CheckSheetDevices_DeviceMST_DeviceId",
                table: "CheckSheetDevices");

            migrationBuilder.DropForeignKey(
                name: "FK_CheckSheetItemMST_CheckSheets_SheetId",
                table: "CheckSheetItemMST");

            migrationBuilder.DropTable(
                name: "ResultActions");

            migrationBuilder.DropTable(
                name: "CheckResults");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CheckSheets",
                table: "CheckSheets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CheckSheetDevices",
                table: "CheckSheetDevices");

            migrationBuilder.RenameTable(
                name: "CheckSheets",
                newName: "CheckSheetMST");

            migrationBuilder.RenameTable(
                name: "CheckSheetDevices",
                newName: "CheckSheetDevice");

            migrationBuilder.RenameIndex(
                name: "IX_CheckSheetDevices_DeviceId",
                table: "CheckSheetDevice",
                newName: "IX_CheckSheetDevice_DeviceId");

            migrationBuilder.RenameIndex(
                name: "IX_CheckSheetDevices_CheckSheetId",
                table: "CheckSheetDevice",
                newName: "IX_CheckSheetDevice_CheckSheetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CheckSheetMST",
                table: "CheckSheetMST",
                column: "SheetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CheckSheetDevice",
                table: "CheckSheetDevice",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckSheetDevice_CheckSheetMST_CheckSheetId",
                table: "CheckSheetDevice",
                column: "CheckSheetId",
                principalTable: "CheckSheetMST",
                principalColumn: "SheetId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CheckSheetDevice_DeviceMST_DeviceId",
                table: "CheckSheetDevice",
                column: "DeviceId",
                principalTable: "DeviceMST",
                principalColumn: "DeviceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CheckSheetItemMST_CheckSheetMST_SheetId",
                table: "CheckSheetItemMST",
                column: "SheetId",
                principalTable: "CheckSheetMST",
                principalColumn: "SheetId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
