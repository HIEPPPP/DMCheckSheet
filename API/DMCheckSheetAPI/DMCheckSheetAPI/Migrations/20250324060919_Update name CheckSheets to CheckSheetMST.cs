using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMCheckSheetAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdatenameCheckSheetstoCheckSheetMST : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckSheetDevices_CheckSheets_CheckSheetId",
                table: "CheckSheetDevices");

            migrationBuilder.DropForeignKey(
                name: "FK_CheckSheetItemMST_CheckSheets_SheetId",
                table: "CheckSheetItemMST");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CheckSheets",
                table: "CheckSheets");

            migrationBuilder.RenameTable(
                name: "CheckSheets",
                newName: "CheckSheetMST");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CheckSheetMST",
                table: "CheckSheetMST",
                column: "SheetId");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckSheetDevices_CheckSheetMST_CheckSheetId",
                table: "CheckSheetDevices",
                column: "CheckSheetId",
                principalTable: "CheckSheetMST",
                principalColumn: "SheetId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CheckSheetItemMST_CheckSheetMST_SheetId",
                table: "CheckSheetItemMST",
                column: "SheetId",
                principalTable: "CheckSheetMST",
                principalColumn: "SheetId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckSheetDevices_CheckSheetMST_CheckSheetId",
                table: "CheckSheetDevices");

            migrationBuilder.DropForeignKey(
                name: "FK_CheckSheetItemMST_CheckSheetMST_SheetId",
                table: "CheckSheetItemMST");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CheckSheetMST",
                table: "CheckSheetMST");

            migrationBuilder.RenameTable(
                name: "CheckSheetMST",
                newName: "CheckSheets");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CheckSheets",
                table: "CheckSheets",
                column: "SheetId");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckSheetDevices_CheckSheets_CheckSheetId",
                table: "CheckSheetDevices",
                column: "CheckSheetId",
                principalTable: "CheckSheets",
                principalColumn: "SheetId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CheckSheetItemMST_CheckSheets_SheetId",
                table: "CheckSheetItemMST",
                column: "SheetId",
                principalTable: "CheckSheets",
                principalColumn: "SheetId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
