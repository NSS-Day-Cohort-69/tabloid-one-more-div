using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Tabloid.Models;
using Microsoft.AspNetCore.Identity;

namespace Tabloid.Data;
public class TabloidDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;

    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<PostTag> PostTags { get; set; }
    public DbSet<Reaction> Reactions { get; set; }
    public DbSet<PostReaction> PostReactions { get; set; }
    public DbSet<Subscription> Subscriptions { get; set; }
    public DbSet<Comment> Comments { get; set; }


    public TabloidDbContext(DbContextOptions<TabloidDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PostReaction>().HasKey(pr => new { pr.UserProfileId, pr.PostId, pr.ReactionId });
        modelBuilder.Entity<PostTag>().HasKey(pt => new { pt.PostId, pt.TagId });
        modelBuilder.Entity<Subscription>().HasKey(s => new { s.FollowerId, s.CreatorId });

        modelBuilder.Entity<PostReaction>()
            .HasOne(pr => pr.Post)
            .WithMany(p => p.PostReactions)
            .HasForeignKey(pr => pr.PostId);
        modelBuilder.Entity<PostReaction>()
            .HasOne(pr => pr.Reaction)
            .WithMany(r => r.PostReactions)
            .HasForeignKey(pr => pr.ReactionId);
        modelBuilder.Entity<PostReaction>()
            .HasOne(pr => pr.UserProfile)
            .WithMany(p => p.PostReactions)
            .HasForeignKey(pr => pr.UserProfileId);

        modelBuilder.Entity<PostTag>()
            .HasOne(pt => pt.Post)
            .WithMany(p => p.PostTags)
            .HasForeignKey(pt => pt.PostId);
        modelBuilder.Entity<PostTag>()
            .HasOne(pt => pt.Tag)
            .WithMany(t => t.PostTags)
            .HasForeignKey(pt => pt.TagId);

        modelBuilder.Entity<Subscription>()
            .HasOne(s => s.Creator)
            .WithMany(c => c.Subscribers)
            .HasForeignKey(s => s.CreatorId);
        modelBuilder.Entity<Subscription>()
            .HasOne(s => s.Follower)
            .WithMany(f => f.Subscriptions)
            .HasForeignKey(s => s.FollowerId);

        modelBuilder.Entity<Category>()
            .HasMany(c => c.Posts)
            .WithOne(p => p.Category)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser[]
        {
            new IdentityUser
            {
                Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                UserName = "Administrator",
                Email = "admina@strator.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                UserName = "JohnDoe",
                Email = "john@doe.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "a7d21fac-3b21-454a-a747-075f072d0cf3",
                UserName = "JaneSmith",
                Email = "jane@smith.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                UserName = "AliceJohnson",
                Email = "alice@johnson.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                UserName = "BobWilliams",
                Email = "bob@williams.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },
            new IdentityUser
            {
                Id = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                UserName = "EveDavis",
                Email = "Eve@Davis.comx",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
            },

        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>[]
        {
            new IdentityUserRole<string>
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
            },
            new IdentityUserRole<string>
            {
                RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                UserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df"
            },

        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
        {
            new UserProfile
            {
                Id = 1,
                IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                FirstName = "Admina",
                LastName = "Strator",
                ImageLocation = "https://robohash.org/numquamutut.png?size=150x150&set=set1",
                CreateDateTime = new DateTime(2022, 1, 25),
                IsActive = true
            },
             new UserProfile
            {
                Id = 2,
                FirstName = "John",
                LastName = "Doe",
                CreateDateTime = new DateTime(2023, 2, 2),
                ImageLocation = "https://robohash.org/nisiautemet.png?size=150x150&set=set1",
                IdentityUserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                IsActive = true
            },
            new UserProfile
            {
                Id = 3,
                FirstName = "Jane",
                LastName = "Smith",
                CreateDateTime = new DateTime(2022, 3, 15),
                ImageLocation = "https://robohash.org/molestiaemagnamet.png?size=150x150&set=set1",
                IdentityUserId = "a7d21fac-3b21-454a-a747-075f072d0cf3",
                IsActive = true
            },
            new UserProfile
            {
                Id = 4,
                FirstName = "Alice",
                LastName = "Johnson",
                CreateDateTime = new DateTime(2023, 6, 10),
                ImageLocation = "https://robohash.org/deseruntutipsum.png?size=150x150&set=set1",
                IdentityUserId = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                IsActive = true
            },
            new UserProfile
            {
                Id = 5,
                FirstName = "Bob",
                LastName = "Williams",
                CreateDateTime = new DateTime(2023, 5, 15),
                ImageLocation = "https://robohash.org/quiundedignissimos.png?size=150x150&set=set1",
                IdentityUserId = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                IsActive = true
            },
            new UserProfile
            {
                Id = 6,
                FirstName = "Eve",
                LastName = "Davis",
                CreateDateTime = new DateTime(2022, 10, 18),
                ImageLocation = "https://robohash.org/hicnihilipsa.png?size=150x150&set=set1",
                IdentityUserId = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                IsActive = true
            }
        });

        modelBuilder.Entity<Category>().HasData(new Category[]
        {
            new Category { Id = 1, Name = "Technology" },
            new Category { Id = 2, Name = "Health" },
            new Category { Id = 3, Name = "Science" },
            new Category { Id = 4, Name = "Art" }
        });

        modelBuilder.Entity<Post>().HasData(new Post[]
        {
            new Post { Id = 1, UserProfileId = 1, CategoryId = 1, IsApproved = true, Title = "Post 1", Content = "Content 1", HeaderImageURL = "https://www.freewebheaders.com/wp-content/gallery/funny/funny-kittens-and-cold-day-website-header.jpg", DateCreated = DateTime.Now.AddDays(-2), PublicationDate = null },
            new Post { Id = 2, UserProfileId = 1, CategoryId = 2, IsApproved = true, Title = "Post 2", Content = "Content 2", HeaderImageURL = "https://www.freewebheaders.com/wp-content/gallery/funny/cache/funny-dog-looking-out-the-car-window-web-header.jpg-nggid044570-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg", DateCreated = DateTime.Now.AddDays(-1), PublicationDate = null },
            new Post { Id = 3, UserProfileId = 2, CategoryId = 1, IsApproved = true, Title = "Post 3", Content = "Content 3", HeaderImageURL = "https://www.freewebheaders.com/wp-content/gallery/funny/funny-kittens-and-cold-day-website-header.jpg", DateCreated = DateTime.Now.AddDays(-4), PublicationDate = DateTime.Now.AddDays(-3) },
            new Post { Id = 4, UserProfileId = 2, CategoryId = 3, IsApproved = true, Title = "Post 4", Content = "Content 4", HeaderImageURL = null, DateCreated = DateTime.Now.AddDays(-2), PublicationDate = DateTime.Now.AddDays(-1) },
            new Post { Id = 5, UserProfileId = 3, CategoryId = 2, IsApproved = true, Title = "Post 5", Content = "Content 5", HeaderImageURL = "https://www.freewebheaders.com/wp-content/gallery/funny/funny-kittens-and-cold-day-website-header.jpg", DateCreated = DateTime.Now.AddDays(-6), PublicationDate = DateTime.Now.AddDays(-2) },
            new Post { Id = 6, UserProfileId = 3, CategoryId = 3, IsApproved = true, Title = "Post 6", Content = "Content 6", HeaderImageURL = "https://www.freewebheaders.com/wp-content/gallery/funny/funny-kittens-and-cold-day-website-header.jpg", DateCreated = DateTime.Now.AddDays(-1), PublicationDate = DateTime.Now.AddDays(2) },
            new Post { Id = 7, UserProfileId = 4, CategoryId = 4, IsApproved = true, Title = "Post 7", Content = "Content 7", HeaderImageURL = null, DateCreated = DateTime.Now.AddDays(-3), PublicationDate = null },
            new Post { Id = 8, UserProfileId = 4, CategoryId = 1, IsApproved = true, Title = "Post 8", Content = "Content 8", HeaderImageURL = "https://www.freewebheaders.com/wp-content/gallery/funny/cache/funny-dog-looking-out-the-car-window-web-header.jpg-nggid044570-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg", DateCreated = DateTime.Now.AddDays(-3), PublicationDate = DateTime.Now.AddDays(-1) },
            new Post { Id = 9, UserProfileId = 5, CategoryId = 2, IsApproved = true, Title = "Post 9", Content = "Content 9", HeaderImageURL = "https://www.freewebheaders.com/wp-content/gallery/funny/funny-kittens-and-cold-day-website-header.jpg", DateCreated = DateTime.Now.AddDays(-5), PublicationDate = null },
            new Post { Id = 10, UserProfileId = 5, CategoryId = 4, IsApproved = false, Title = "Post 10", Content = "Content 10", HeaderImageURL = null, DateCreated = DateTime.Now.AddDays(-2), PublicationDate = null },
            new Post { Id = 11, UserProfileId = 6, CategoryId = 3, IsApproved = true, Title = "Post 11", Content = "Content 11", HeaderImageURL = null, DateCreated = DateTime.Now.AddDays(-3), PublicationDate = null },
            new Post { Id = 12, UserProfileId = 6, CategoryId = 4, IsApproved = true, Title = "Post 12", Content = "Content 12", HeaderImageURL = null, DateCreated = DateTime.Now, PublicationDate = null },
            new Post { Id = 13, UserProfileId = 1, CategoryId = 1, IsApproved = false, Title = "Post 13", Content = "Content 13", HeaderImageURL = "https://www.freewebheaders.com/wp-content/gallery/funny/funny-kittens-and-cold-day-website-header.jpg", DateCreated = DateTime.Now.AddDays(-1), PublicationDate = DateTime.Now },
            new Post { Id = 14, UserProfileId = 2, CategoryId = 2, IsApproved = false, Title = "Post 14", Content = "Content 14", HeaderImageURL = "https://www.freewebheaders.com/wp-content/gallery/funny/cache/funny-dog-looking-out-the-car-window-web-header.jpg-nggid044570-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg", DateCreated = DateTime.Now, PublicationDate = null },
            new Post { Id = 15, UserProfileId = 3, CategoryId = 3, IsApproved = false, Title = "Post 15", Content = "Content 15", HeaderImageURL = null, DateCreated = DateTime.Now, PublicationDate = null }
        });

        modelBuilder.Entity<Comment>().HasData(new Comment[]
        {
            new Comment { Id = 1, UserProfileId = 1, PostId = 1, Content = "Comment 1", DateCreated = DateTime.Now.AddDays(-1), Subject = "Subject 1" },
            new Comment { Id = 2, UserProfileId = 1, PostId = 2, Content = "Comment 2", DateCreated = DateTime.Now.AddDays(-1), Subject = "Subject 2" },
            new Comment { Id = 3, UserProfileId = 2, PostId = 3, Content = "Comment 3", DateCreated = DateTime.Now.AddDays(-1), Subject = "Subject 3" },
            new Comment { Id = 4, UserProfileId = 2, PostId = 4, Content = "Comment 4", DateCreated = DateTime.Now.AddDays(-1), Subject = "Subject 4" },
            new Comment { Id = 5, UserProfileId = 3, PostId = 5, Content = "Comment 5", DateCreated = DateTime.Now.AddDays(-1), Subject = "Subject 5" },
            new Comment { Id = 6, UserProfileId = 3, PostId = 6, Content = "Comment 6", DateCreated = DateTime.Now, Subject = "Subject 6" },
            new Comment { Id = 7, UserProfileId = 4, PostId = 7, Content = "Comment 7", DateCreated = DateTime.Now, Subject = "Subject 7" },
            new Comment { Id = 8, UserProfileId = 4, PostId = 8, Content = "Comment 8", DateCreated = DateTime.Now, Subject = "Subject 8" },
            new Comment { Id = 9, UserProfileId = 5, PostId = 9, Content = "Comment 9", DateCreated = DateTime.Now, Subject = "Subject 9" },
            new Comment { Id = 10, UserProfileId = 5, PostId = 10, Content = "Comment 10", DateCreated = DateTime.Now, Subject = "Subject 10" },
            new Comment { Id = 11, UserProfileId = 6, PostId = 11, Content = "Comment 11", DateCreated = DateTime.Now, Subject = "Subject 11" },
            new Comment { Id = 12, UserProfileId = 6, PostId = 12, Content = "Comment 12", DateCreated = DateTime.Now, Subject = "Subject 12" },
            new Comment { Id = 13, UserProfileId = 1, PostId = 13, Content = "Comment 13", DateCreated = DateTime.Now, Subject = "Subject 13" },
            new Comment { Id = 14, UserProfileId = 2, PostId = 14, Content = "Comment 14", DateCreated = DateTime.Now, Subject = "Subject 14" },
            new Comment { Id = 15, UserProfileId = 3, PostId = 15, Content = "Comment 15", DateCreated = DateTime.Now, Subject = "Subject 15" },
            new Comment { Id = 16, UserProfileId = 4, PostId = 1, Content = "Comment 16", DateCreated = DateTime.Now, Subject = "Subject 16" },
            new Comment { Id = 17, UserProfileId = 5, PostId = 2, Content = "Comment 17", DateCreated = DateTime.Now, Subject = "Subject 17" },
            new Comment { Id = 18, UserProfileId = 6, PostId = 3, Content = "Comment 18", DateCreated = DateTime.Now, Subject = "Subject 18" },
            new Comment { Id = 19, UserProfileId = 1, PostId = 4, Content = "Comment 19", DateCreated = DateTime.Now, Subject = "Subject 19" },
            new Comment { Id = 20, UserProfileId = 2, PostId = 5, Content = "Comment 20", DateCreated = DateTime.Now, Subject = "Subject 20" }
        });

        modelBuilder.Entity<Reaction>().HasData(new Reaction[]
        {
            new Reaction { Id = 1, Name = "Like", ReactionImage = "👍" },
            new Reaction { Id = 2, Name = "Love", ReactionImage = "❤️" },
            new Reaction { Id = 3, Name = "Wow", ReactionImage = "😮" },
            new Reaction { Id = 4, Name = "Sad", ReactionImage = "😭" },
            new Reaction { Id = 5, Name = "Angry", ReactionImage = "😠" }
        });

        modelBuilder.Entity<PostReaction>().HasData(new PostReaction[]
        {
            new PostReaction { UserProfileId = 1, PostId = 1, ReactionId = 1 },
            new PostReaction { UserProfileId = 2, PostId = 2, ReactionId = 2 },
            new PostReaction { UserProfileId = 3, PostId = 3, ReactionId = 3 },
            new PostReaction { UserProfileId = 4, PostId = 4, ReactionId = 4 },
            new PostReaction { UserProfileId = 5, PostId = 5, ReactionId = 5 },
            new PostReaction { UserProfileId = 6, PostId = 6, ReactionId = 1 },
            new PostReaction { UserProfileId = 1, PostId = 7, ReactionId = 2 },
            new PostReaction { UserProfileId = 2, PostId = 8, ReactionId = 3 },
            new PostReaction { UserProfileId = 3, PostId = 9, ReactionId = 4 },
            new PostReaction { UserProfileId = 4, PostId = 10, ReactionId = 5 },
            new PostReaction { UserProfileId = 5, PostId = 11, ReactionId = 1 },
            new PostReaction { UserProfileId = 6, PostId = 12, ReactionId = 2 }
        });

        modelBuilder.Entity<Tag>().HasData(new Tag[]
        {
            new Tag { Id = 1, Name = "News" },
            new Tag { Id = 2, Name = "Opinion" },
            new Tag { Id = 3, Name = "How To" },
            new Tag { Id = 4, Name = "Update" },
            new Tag { Id = 5, Name = "Discussion" },
            new Tag { Id = 6, Name = "Challenge" },
            new Tag { Id = 7, Name = "Press Release" }
        });

        modelBuilder.Entity<PostTag>().HasData(new PostTag[]
        {
            new PostTag { PostId = 1, TagId = 1 },
            new PostTag { PostId = 2, TagId = 2 },
            new PostTag { PostId = 3, TagId = 3 },
            new PostTag { PostId = 4, TagId = 4 },
            new PostTag { PostId = 5, TagId = 5 },
            new PostTag { PostId = 6, TagId = 6 },
            new PostTag { PostId = 7, TagId = 1 },
            new PostTag { PostId = 8, TagId = 2 },
            new PostTag { PostId = 9, TagId = 3 },
            new PostTag { PostId = 10, TagId = 4 },
            new PostTag { PostId = 11, TagId = 5 },
            new PostTag { PostId = 12, TagId = 6 },
            new PostTag { PostId = 13, TagId = 1 },
            new PostTag { PostId = 14, TagId = 2 },
            new PostTag { PostId = 15, TagId = 3 },
            new PostTag { PostId = 1, TagId = 4 },
            new PostTag { PostId = 2, TagId = 5 },
            new PostTag { PostId = 3, TagId = 6 },
            new PostTag { PostId = 4, TagId = 1 }
        });

        modelBuilder.Entity<Subscription>().HasData(new Subscription[]
        {
            new Subscription { CreatorId = 1, FollowerId = 2 },
            new Subscription { CreatorId = 1, FollowerId = 3 },
            new Subscription { CreatorId = 1, FollowerId = 4 },
            new Subscription { CreatorId = 1, FollowerId = 5 },
            new Subscription { CreatorId = 1, FollowerId = 6 },
            new Subscription { CreatorId = 2, FollowerId = 1 },
            new Subscription { CreatorId = 2, FollowerId = 3 },
            new Subscription { CreatorId = 2, FollowerId = 4 },
            new Subscription { CreatorId = 2, FollowerId = 5 },
            new Subscription { CreatorId = 2, FollowerId = 6 },
            new Subscription { CreatorId = 3, FollowerId = 1 },
            new Subscription { CreatorId = 3, FollowerId = 2 }
        });
    }
}