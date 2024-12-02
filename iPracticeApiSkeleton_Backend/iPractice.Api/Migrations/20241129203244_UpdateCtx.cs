using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace iPractice.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCtx : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssignedClientIds",
                table: "Psychologists");

            migrationBuilder.CreateTable(
                name: "ClientAssignments",
                columns: table => new
                {
                    PsychologistId = table.Column<long>(type: "INTEGER", nullable: false),
                    AssignedClientIds = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientAssignments", x => x.PsychologistId);
                    table.ForeignKey(
                        name: "FK_ClientAssignments_Psychologists_PsychologistId",
                        column: x => x.PsychologistId,
                        principalTable: "Psychologists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientAssignments");

            migrationBuilder.AddColumn<string>(
                name: "AssignedClientIds",
                table: "Psychologists",
                type: "TEXT",
                nullable: true);
        }
    }
}
