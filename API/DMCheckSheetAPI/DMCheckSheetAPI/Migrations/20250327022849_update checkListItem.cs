using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMCheckSheetAPI.Migrations
{
    /// <inheritdoc />
    public partial class updatecheckListItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemName",
                table: "CheckSheetItemMST");

            migrationBuilder.DropColumn(
                name: "ItemTitle",
                table: "CheckSheetItemMST");

            migrationBuilder.AlterColumn<string>(
                name: "DataType",
                table: "CheckSheetItemMST",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "CheckSheetItemMST",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "OrderNumber",
                table: "CheckSheetItemMST",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "CheckSheetItemMST",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "CheckSheetItemMST");

            migrationBuilder.DropColumn(
                name: "OrderNumber",
                table: "CheckSheetItemMST");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "CheckSheetItemMST");

            migrationBuilder.AlterColumn<string>(
                name: "DataType",
                table: "CheckSheetItemMST",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemName",
                table: "CheckSheetItemMST",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemTitle",
                table: "CheckSheetItemMST",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
