using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMCheckSheetAPI.Migrations
{
    /// <inheritdoc />
    public partial class updaterelationshipcheckresultandresultaction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ResultActions_ResultId",
                table: "ResultActions");

            migrationBuilder.CreateIndex(
                name: "IX_ResultActions_ResultId",
                table: "ResultActions",
                column: "ResultId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ResultActions_ResultId",
                table: "ResultActions");

            migrationBuilder.CreateIndex(
                name: "IX_ResultActions_ResultId",
                table: "ResultActions",
                column: "ResultId");
        }
    }
}
