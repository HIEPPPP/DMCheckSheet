using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMCheckSheetAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddCancelFlagProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CancelFlag",
                table: "DeviceMST",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "CancelFlag",
                table: "CheckSheets",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "CancelFlag",
                table: "CheckSheetItemMST",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdateAt",
                table: "CheckResults",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UpdateBy",
                table: "CheckResults",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CancelFlag",
                table: "DeviceMST");

            migrationBuilder.DropColumn(
                name: "CancelFlag",
                table: "CheckSheets");

            migrationBuilder.DropColumn(
                name: "CancelFlag",
                table: "CheckSheetItemMST");

            migrationBuilder.DropColumn(
                name: "UpdateAt",
                table: "CheckResults");

            migrationBuilder.DropColumn(
                name: "UpdateBy",
                table: "CheckResults");
        }
    }
}
