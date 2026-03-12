using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SepetYorumla.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddSavedBasket : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SavedBaskets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BasketId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedBaskets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedBaskets_Baskets_BasketId",
                        column: x => x.BasketId,
                        principalTable: "Baskets",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SavedBaskets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SavedBaskets_BasketId",
                table: "SavedBaskets",
                column: "BasketId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedBaskets_UserId_BasketId",
                table: "SavedBaskets",
                columns: new[] { "UserId", "BasketId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SavedBaskets");
        }
    }
}
