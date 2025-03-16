using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMCheckSheetAPI.Migrations
{
    /// <inheritdoc />
    public partial class Updatechecklistitless : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckListItemMST_CheckListTitleMST_TitleId",
                table: "CheckListItemMST");

            migrationBuilder.DropTable(
                name: "CheckListTitleMST");

            migrationBuilder.DropIndex(
                name: "IX_CheckListItemMST_TitleId",
                table: "CheckListItemMST");

            migrationBuilder.DropColumn(
                name: "TitleId",
                table: "CheckListItemMST");

            migrationBuilder.AddColumn<string>(
                name: "CheckTitle",
                table: "CheckListItemMST",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CheckTitle",
                table: "CheckListItemMST");

            migrationBuilder.AddColumn<int>(
                name: "TitleId",
                table: "CheckListItemMST",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CheckListTitleMST",
                columns: table => new
                {
                    TitleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    TitleName = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateBy = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheckListTitleMST", x => x.TitleId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CheckListItemMST_TitleId",
                table: "CheckListItemMST",
                column: "TitleId");

            migrationBuilder.AddForeignKey(
                name: "FK_CheckListItemMST_CheckListTitleMST_TitleId",
                table: "CheckListItemMST",
                column: "TitleId",
                principalTable: "CheckListTitleMST",
                principalColumn: "TitleId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
