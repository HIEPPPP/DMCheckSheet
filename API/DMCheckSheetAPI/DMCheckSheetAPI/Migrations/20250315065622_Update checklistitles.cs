using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMCheckSheetAPI.Migrations
{
    /// <inheritdoc />
    public partial class Updatechecklistitles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckListItemMST_TitleItemMST_TitleId",
                table: "CheckListItemMST");

            migrationBuilder.DropTable(
                name: "TitleItemMST");

            migrationBuilder.CreateTable(
                name: "CheckListTitleMST",
                columns: table => new
                {
                    TitleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TitleName = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreateBy = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    UpdateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateBy = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheckListTitleMST", x => x.TitleId);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_CheckListItemMST_CheckListTitleMST_TitleId",
                table: "CheckListItemMST",
                column: "TitleId",
                principalTable: "CheckListTitleMST",
                principalColumn: "TitleId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CheckListItemMST_CheckListTitleMST_TitleId",
                table: "CheckListItemMST");

            migrationBuilder.DropTable(
                name: "CheckListTitleMST");

            migrationBuilder.CreateTable(
                name: "TitleItemMST",
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
                    table.PrimaryKey("PK_TitleItemMST", x => x.TitleId);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_CheckListItemMST_TitleItemMST_TitleId",
                table: "CheckListItemMST",
                column: "TitleId",
                principalTable: "TitleItemMST",
                principalColumn: "TitleId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
