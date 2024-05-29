using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Tabloid.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ReactionImage = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reactions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CreateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    ImageLocation = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    IdentityUserId = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProfiles_AspNetUsers_IdentityUserId",
                        column: x => x.IdentityUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: true),
                    IsApproved = table.Column<bool>(type: "boolean", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    HeaderImageURL = table.Column<string>(type: "text", nullable: true),
                    PublicationDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Posts_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    CreatorId = table.Column<int>(type: "integer", nullable: false),
                    FollowerId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => new { x.FollowerId, x.CreatorId });
                    table.ForeignKey(
                        name: "FK_Subscriptions_UserProfiles_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Subscriptions_UserProfiles_FollowerId",
                        column: x => x.FollowerId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    PostId = table.Column<int>(type: "integer", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PostReactions",
                columns: table => new
                {
                    UserProfileId = table.Column<int>(type: "integer", nullable: false),
                    PostId = table.Column<int>(type: "integer", nullable: false),
                    ReactionId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostReactions", x => new { x.UserProfileId, x.PostId, x.ReactionId });
                    table.ForeignKey(
                        name: "FK_PostReactions_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PostReactions_Reactions_ReactionId",
                        column: x => x.ReactionId,
                        principalTable: "Reactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PostReactions_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PostTags",
                columns: table => new
                {
                    PostId = table.Column<int>(type: "integer", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostTags", x => new { x.PostId, x.TagId });
                    table.ForeignKey(
                        name: "FK_PostTags_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PostTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", null, "Admin", "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "9ce89d88-75da-4a80-9b0d-3fe58582b8e2", 0, "5de37a97-c4e7-4739-9951-b00945d92eb5", "bob@williams.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEJjQh/UL9wz1wxvL7kKO237fm8dezPvd6y/w715+7KGa78vaTdJRdHJYvMF1+yVhQg==", null, false, "0af8ebb3-5363-427c-8879-801fa0cb55b0", false, "BobWilliams" },
                    { "a7d21fac-3b21-454a-a747-075f072d0cf3", 0, "1db1311d-0c5a-4a6d-8c62-cb1a53d96755", "jane@smith.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEMRc77U+N8gOPlpPVvGMTX8ueNGu5mqQszSrJwOgj2IXxEVHBjRJYyNSAgWGY6Bqyw==", null, false, "360a3308-d59b-4653-889a-e1d24038cce2", false, "JaneSmith" },
                    { "c806cfae-bda9-47c5-8473-dd52fd056a9b", 0, "bd2294e8-445b-4f15-9884-c0ec57e0bc64", "alice@johnson.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEEb8Cy4BtlUA2LSbhLIDiO1ulULxp+SFb7yPb2wc60tCu/3l3WrqjHAiINGvExcFWQ==", null, false, "03a80aa2-2b6b-4d24-bcb7-c6ab03342516", false, "AliceJohnson" },
                    { "d224a03d-bf0c-4a05-b728-e3521e45d74d", 0, "726cd09b-1982-442d-9d67-ad5b924c8304", "Eve@Davis.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEKPCf02ZQSXD3cdKcIt4axchuhtT0ptd4phTgPqhnK0xhXT/ngErnfAwllebT5MoDQ==", null, false, "b9e8f9e2-d6ca-43bf-8616-90b8e7d8eba3", false, "EveDavis" },
                    { "d8d76512-74f1-43bb-b1fd-87d3a8aa36df", 0, "3b413f2b-b4d5-41c8-8c59-42802ab626a1", "john@doe.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEP/Ei+DoTjGPfomFBwcu4xOUAJj87OaIrSdObN/XkMqcQZ9H4nvyXpmeiQUh4lj4tw==", null, false, "4c88b37a-2d6d-4c82-8a47-f84d5bee1539", false, "JohnDoe" },
                    { "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", 0, "47abe7d2-e768-424a-9ccb-23aa2ad1e7c8", "admina@strator.comx", false, false, null, null, null, "AQAAAAIAAYagAAAAEKAkVa6VUQgFcFpVdY72x8IIMoGEskZQ6/bN3jfagxlEmea7/XgDLveHyxnw4ZlCQA==", null, false, "c7e66b7a-4887-4c54-8ce2-efa4e750d751", false, "Administrator" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Technology" },
                    { 2, "Health" },
                    { 3, "Science" },
                    { 4, "Art" }
                });

            migrationBuilder.InsertData(
                table: "Reactions",
                columns: new[] { "Id", "Name", "ReactionImage" },
                values: new object[,]
                {
                    { 1, "Like", "👍" },
                    { 2, "Love", "❤️" },
                    { 3, "Wow", "😮" },
                    { 4, "Sad", "😭" },
                    { 5, "Angry", "😠" }
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "News" },
                    { 2, "Opinion" },
                    { 3, "How To" },
                    { 4, "Update" },
                    { 5, "Discussion" },
                    { 6, "Challenge" },
                    { 7, "Press Release" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "d8d76512-74f1-43bb-b1fd-87d3a8aa36df" },
                    { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" }
                });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Id", "CreateDateTime", "FirstName", "IdentityUserId", "ImageLocation", "IsActive", "LastName" },
                values: new object[,]
                {
                    { 1, new DateTime(2022, 1, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admina", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", "https://robohash.org/numquamutut.png?size=150x150&set=set1", true, "Strator" },
                    { 2, new DateTime(2023, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "John", "d8d76512-74f1-43bb-b1fd-87d3a8aa36df", "https://robohash.org/nisiautemet.png?size=150x150&set=set1", true, "Doe" },
                    { 3, new DateTime(2022, 3, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Jane", "a7d21fac-3b21-454a-a747-075f072d0cf3", "https://robohash.org/molestiaemagnamet.png?size=150x150&set=set1", true, "Smith" },
                    { 4, new DateTime(2023, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "Alice", "c806cfae-bda9-47c5-8473-dd52fd056a9b", "https://robohash.org/deseruntutipsum.png?size=150x150&set=set1", true, "Johnson" },
                    { 5, new DateTime(2023, 5, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Bob", "9ce89d88-75da-4a80-9b0d-3fe58582b8e2", "https://robohash.org/quiundedignissimos.png?size=150x150&set=set1", true, "Williams" },
                    { 6, new DateTime(2022, 10, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "Eve", "d224a03d-bf0c-4a05-b728-e3521e45d74d", "https://robohash.org/hicnihilipsa.png?size=150x150&set=set1", true, "Davis" }
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "CategoryId", "Content", "HeaderImageURL", "IsApproved", "PublicationDate", "Title", "UserProfileId" },
                values: new object[,]
                {
                    { 1, 1, "Content 1", "https://www.freewebheaders.com/wp-content/gallery/funny/funny-kittens-and-cold-day-website-header.jpg", true, new DateTime(2024, 5, 27, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(8837), "Post 1", 1 },
                    { 2, 2, "Content 2", "https://www.freewebheaders.com/wp-content/gallery/funny/cache/funny-dog-looking-out-the-car-window-web-header.jpg-nggid044570-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg", true, new DateTime(2024, 5, 28, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(8916), "Post 2", 1 },
                    { 3, 1, "Content 3", "https://www.freewebheaders.com/wp-content/gallery/funny/funny-kittens-and-cold-day-website-header.jpg", true, new DateTime(2024, 5, 25, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(8925), "Post 3", 2 },
                    { 4, 3, "Content 4", null, true, new DateTime(2024, 5, 28, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(8931), "Post 4", 2 },
                    { 5, 2, "Content 5", "https://www.freewebheaders.com/wp-content/gallery/funny/funny-kittens-and-cold-day-website-header.jpg", true, new DateTime(2024, 5, 27, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(8939), "Post 5", 3 },
                    { 6, 3, "Content 6", "https://www.freewebheaders.com/wp-content/gallery/funny/funny-kittens-and-cold-day-website-header.jpg", true, new DateTime(2024, 5, 27, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(8951), "Post 6", 3 },
                    { 7, 4, "Content 7", null, true, new DateTime(2024, 5, 26, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(8965), "Post 7", 4 },
                    { 8, 1, "Content 8", "https://www.freewebheaders.com/wp-content/gallery/funny/cache/funny-dog-looking-out-the-car-window-web-header.jpg-nggid044570-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg", true, new DateTime(2024, 5, 28, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(8971), "Post 8", 4 },
                    { 9, 2, "Content 9", "https://www.freewebheaders.com/wp-content/gallery/funny/funny-kittens-and-cold-day-website-header.jpg", true, new DateTime(2024, 5, 24, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(8977), "Post 9", 5 },
                    { 10, 4, "Content 10", null, false, new DateTime(2024, 5, 27, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(8983), "Post 10", 5 },
                    { 11, 3, "Content 11", null, true, new DateTime(2024, 5, 26, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(8997), "Post 11", 6 },
                    { 12, 4, "Content 12", null, true, new DateTime(2024, 5, 29, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(9011), "Post 12", 6 },
                    { 13, 1, "Content 13", "https://www.freewebheaders.com/wp-content/gallery/funny/funny-kittens-and-cold-day-website-header.jpg", false, new DateTime(2024, 5, 29, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(9016), "Post 13", 1 },
                    { 14, 2, "Content 14", "https://www.freewebheaders.com/wp-content/gallery/funny/cache/funny-dog-looking-out-the-car-window-web-header.jpg-nggid044570-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg", false, new DateTime(2024, 5, 29, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(9022), "Post 14", 2 },
                    { 15, 3, "Content 15", null, false, new DateTime(2024, 5, 29, 10, 22, 59, 684, DateTimeKind.Local).AddTicks(9027), "Post 15", 3 }
                });

            migrationBuilder.InsertData(
                table: "Subscriptions",
                columns: new[] { "CreatorId", "FollowerId" },
                values: new object[,]
                {
                    { 2, 1 },
                    { 3, 1 },
                    { 1, 2 },
                    { 3, 2 },
                    { 1, 3 },
                    { 2, 3 },
                    { 1, 4 },
                    { 2, 4 },
                    { 1, 5 },
                    { 2, 5 },
                    { 1, 6 },
                    { 2, 6 }
                });

            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "Id", "Content", "PostId", "UserProfileId" },
                values: new object[,]
                {
                    { 1, "Comment 1", 1, 1 },
                    { 2, "Comment 2", 2, 1 },
                    { 3, "Comment 3", 3, 2 },
                    { 4, "Comment 4", 4, 2 },
                    { 5, "Comment 5", 5, 3 },
                    { 6, "Comment 6", 6, 3 },
                    { 7, "Comment 7", 7, 4 },
                    { 8, "Comment 8", 8, 4 },
                    { 9, "Comment 9", 9, 5 },
                    { 10, "Comment 10", 10, 5 },
                    { 11, "Comment 11", 11, 6 },
                    { 12, "Comment 12", 12, 6 },
                    { 13, "Comment 13", 13, 1 },
                    { 14, "Comment 14", 14, 2 },
                    { 15, "Comment 15", 15, 3 },
                    { 16, "Comment 16", 1, 4 },
                    { 17, "Comment 17", 2, 5 },
                    { 18, "Comment 18", 3, 6 },
                    { 19, "Comment 19", 4, 1 },
                    { 20, "Comment 20", 5, 2 }
                });

            migrationBuilder.InsertData(
                table: "PostReactions",
                columns: new[] { "PostId", "ReactionId", "UserProfileId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 7, 2, 1 },
                    { 2, 2, 2 },
                    { 8, 3, 2 },
                    { 3, 3, 3 },
                    { 9, 4, 3 },
                    { 4, 4, 4 },
                    { 10, 5, 4 },
                    { 5, 5, 5 },
                    { 11, 1, 5 },
                    { 6, 1, 6 },
                    { 12, 2, 6 }
                });

            migrationBuilder.InsertData(
                table: "PostTags",
                columns: new[] { "PostId", "TagId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 4 },
                    { 2, 2 },
                    { 2, 5 },
                    { 3, 3 },
                    { 3, 6 },
                    { 4, 1 },
                    { 4, 4 },
                    { 5, 5 },
                    { 6, 6 },
                    { 7, 1 },
                    { 8, 2 },
                    { 9, 3 },
                    { 10, 4 },
                    { 11, 5 },
                    { 12, 6 },
                    { 13, 1 },
                    { 14, 2 },
                    { 15, 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Comments_PostId",
                table: "Comments",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserProfileId",
                table: "Comments",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_PostReactions_PostId",
                table: "PostReactions",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_PostReactions_ReactionId",
                table: "PostReactions",
                column: "ReactionId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_CategoryId",
                table: "Posts",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UserProfileId",
                table: "Posts",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_PostTags_TagId",
                table: "PostTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_CreatorId",
                table: "Subscriptions",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_IdentityUserId",
                table: "UserProfiles",
                column: "IdentityUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "PostReactions");

            migrationBuilder.DropTable(
                name: "PostTags");

            migrationBuilder.DropTable(
                name: "Subscriptions");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Reactions");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
