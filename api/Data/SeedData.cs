using System;
using System.Collections.Generic;
using System.Linq;
using api.Models;
using api.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Alias = api.Models.Alias;

namespace api.Data
{
    public class SeedData
    {

        public async void Seed(ModelBuilder builder)
        {
            // The database identity column sequence doesn't take the seeded entities' Ids into consideration, and will generate conflicting values if given the chance
            builder.Entity<Text>().Property(e => e.Id)
                .HasIdentityOptions(startValue: 100);
            builder.Entity<Section>().Property(e => e.Id)
                .HasIdentityOptions(startValue: 100);
            builder.Entity<Alias>().Property(e => e.Id)
                .HasIdentityOptions(startValue: 100);
            builder.Entity<Performance>().Property(e => e.Id)
                .HasIdentityOptions(startValue: 100);
            builder.Entity<RawStats>().Property(e => e.Id)
                .HasIdentityOptions(startValue: 100);

            var hasher = new PasswordHasher<ApplicationUser>();
            builder.Entity<ApplicationUser>().HasData(
                new ApplicationUser
                {
                    Id = "1",
                    UserName = "Cosmo_Kramer",
                    NormalizedUserName = "COSMO_KRAMER",
                    Email = "kramer@example.com",
                    NormalizedEmail = "KRAMER@EXAMPLE.COM",
                    PasswordHash = hasher.HashPassword(null, "password")
                },
                new ApplicationUser
                {
                    Id = "2",
                    UserName = "Bob_Sacamano",
                    NormalizedUserName = "BOB_SACAMANO",
                    Email = "bob.sacamano@example.com",
                    NormalizedEmail = "BOB.SACAMANO@EXAMPLE.COM",
                    PasswordHash = hasher.HashPassword(null, "password"),
                }
            );

            builder.Entity<Section>().HasData(
                new Section
                {
                    Id = 1,
                    Title = "The Hook",
                    Content =
                        @"A cold wind gusted through the night, across the snow-covered land where men had been killing one another for the past three days. The air was crisp, if not so icy as Lan expected for this time of year.",
                    Difficulty = 0,
                    TextId = 3
                },
                new Section
                {
                    Id = 2,
                    Title = "Practice",
                    Content =
                        @"The wide corridor outside of the Amyrlin's apartments was as cold as her sitting room had been, and full of drafts. Some were strong enough to ripple one or another of the long, heavy tapestries on the white marble walls. Atop the gilded stand-lamps between the bright wall hangings, the flames flickered, nearly blown out. The novices would be at their breakfast at this hour, and likely most of the other Accepted, too. For the moment, the hallways were empty save for Siuan and Moiraine. They walked along the blue runner, half the width of the corridor, taking advantage of the small protection the carpet gave from the chill of the floor tiles, a repeating pattern in the colors of all seven Ajahs. Moiraine was too stunned to speak. The faint sound of the trumpets still sounding barely registered on her. They turned the corner into a hallway where the floor tiles were white, the runner green. To their right, another wide, tapestry-hung corridor lined with stand-lamps spiraled gently upward, toward the Ajahs’ quarters, the visible portion floored in blue and yellow, with a runner patterned in gray and brown and red. Inside each Ajah’s quarters, the Ajah’s own color predominated, and some others might be missing altogether, but in the communal areas of the Tower, the colors of all the Ajahs were used in equal proportion. Irrelevant thoughts drifted through her head. Why equal, when some Ajahs were larger than others? Had they once been the same size? How could that have been achieved? A newly raised Aes Sedai chose her Ajah freely. Yet each Ajah had quarters of the same size. Irrelevant thoughts were better than...",
                    Difficulty = 0,
                    TextId = 3
                },
                new Section
                {
                    Id = 3,
                    Title = "Shreds of Serenity",
                    Content = @"And yet, she knew the answer. What had to be the answer. Nothing else fit. But they felt no urgency. Taking the boy from his mother straightaway would be cruel. Maybe they thought they had years to find him, but if that was the case, they had not even seen the list yet, with so many entries lacking as much as a home village. Maybe they were waiting for its completion. She hoped there were other searchers, because Siuan reported Valera and Ludice were still in the Tower.",
                    Difficulty = 0,
                    TextId = 3
                },
                new Section
                {
                    Id = 4,
                    Title = "Prologue",
                    Content = @"Verily I say unto you, the era of the sword and axe is nigh, the era of the wolf's blizzard. The Time of the White Chill and the White Light is nigh, the Time of Madness and the Time of Contempt: Tedd Deireddh, the Time of End. The world will die amidst frost and be reborn with the new sun. It will be reborn of the Elder Blood, of Hen Ichaer, of the seed that has been sown. A seed which will not sprout but will burst into flame.
Ess'tuath esse! Thus it shall be! Watch for the signs! What signs these shall be, I say unto you: first the earth will flow with the blood of Aen Seidhe, the Blood of Elves...",
                    Difficulty = 0,
                    TextId = 2
                },
                new Section
                {
                    Id = 5,
                    Title = "Chapter One",
                    Content = @"^'It would not be an exaggeration to say,^' continued the wizard, ^'that you have moved us deeply, Master Dandilion. You have prompted us to reflection and thought; you have stirred our hearts. Allow me to express our gratitude, and our respect.^'
The troubadour stood and took a bow, sweeping the heron feather pinned to his fashionable hat across his knees. His apprentice broke off his playing, grinned and bowed too, until Dandilion glared at him sternly and snapped something under his breath. The boy lowered his head and returned to softly strumming his lute strings.",
                    Difficulty = 0,
                    TextId = 2
                },
                new Section
                {
                    Id = 6,
                    Title = "Chapter Two",
                    Content = @"Triss Merigold blew into her frozen hands, wriggled her fingers and murmured a magic formula. Her horse, a gelding, immediately reacted to the spell, snorting and turning its head, looking at the enchantress with eyes made watery by the cold and wind.
^'You've got two options, old thing,^' said Triss, pulling on her gloves. ^'Either you get used to magic or I sell you to some peasants to pull a plough.^'
The gelding pricked up its ears, snorted vapour through its nostrils and obediently started down the wooded mountainside. The magician leaned over in the saddle, avoiding being lashed by the frosty branches.
The magic worked quickly; she stopped feeling the sting of cold in her elbows and on her neck and the unpleasant sensation of cold which had made her hunch her shoulders and draw her head in disappeared. The spell, warming her, also muffled the hunger which had been eating at her for several hours.",
                    Difficulty = 0,
                    TextId = 2
                },
                new Section
                {
                    Id = 7,
                    Title = "Chapter Four",
                    Content = @"^'Your fears were unfounded, entirely ungrounded.^' Triss grimaced, resting her elbows on the table. ^'The time when wizards used to hunt Sources and magically gifted children, tearing them from their parents or guardians by force or deceit, is long gone. Did you really think I might want to take Ciri away from you?^'
Lambert snorted and turned his face away. Eskel and Vesemir looked at Geralt, and Geralt said nothing. He continued to gaze off to the side, playing incessantly with his silver witcher medallion, depicting the head of a snarling wolf. Triss knew the medallion reacted to magic. On such a night as Midinvaerne, when the air itself was vibrating with magic, the witchers' medallions must be practically humming. It must be both irritating and bothersome.
^'No, child,^' Vesemir finally said. ^'We know you would not do such a thing.^'",
                    Difficulty = 0,
                    TextId = 2
                },
                new Section
                {
                    Id = 8,
                    Title = "Acknowledgments",
                    Content = @"This book is a distillation and adaptation of over eight years’ worth of my technical articles and news report- ing for Ars Technica, and as such, it reflects the insights and information offered to me by the many thousands of readers who’ve taken the time to contact me with their feedback. Journalists, professors, students, industry professionals, and, in many cases, some of the scientists and engineers who’ve worked on the processors covered in this book have all contributed to the text within these pages, and I want to thank these correspondents for their corrections, clari- fications, and patient explanations. In particular, I’d like to thank the folks at IBM for their help with the articles that provided the material for the part of the book dealing with the PowerPC 970. I’d also like to thank Intel Corp., and George Alfs in particular, for answering my questions about the processors.",
                    Difficulty = 0,
                    TextId = 1
                },
                new Section
                {
                    Id = 9,
                    Title = "Pipeline Stalls",
                    Content = @"In the real world, a processor’s pipeline can be found in more conditions than just the two described so far: a full pipeline or a pipeline that’s being filled. Sometimes, instructions get hung up in one pipeline stage for multiple cycles. There are a number of reasons why this might happen - we’ll discuss many of them throughout this book - but when it happens, the pipeline is said to stall. When the pipeline stalls, or gets hung in a certain stage, all of the instructions in the stages below the one where the stall happened continue advancing normally, while the stalled instruction just sits in its stage, and all the instructions behind it back up.",
                    Difficulty = 0,
                    TextId = 1
                }
            );

            builder.Entity<Text>().HasData(
                new Text
                {
                    Id = 1,
                    Title = "Inside the Machine",
                    Author = "Jon Stokes",
                    CoverURL = "https://images-na.ssl-images-amazon.com/images/I/81gwE7V6TJL.jpg",
                    ISBN = "978-1593276683",
                    Genres = new string[] {"Technology"},
                    DateOfUpload = DateTime.UtcNow,
                },
                new Text
                {
                    Id = 2,
                    Title = "The Witcher - Blood of Elves",
                    Author = "Andrzej Sapkowski",
                    CoverURL =
                        "https://images-na.ssl-images-amazon.com/images/I/51xAJZfjFwL._SX306_BO1,204,203,200_.jpg",
                    ISBN = "978-0316029193",
                    Genres = new string[] {"Fantasy", "Action & Adventure"},
                    DateOfUpload = DateTime.UtcNow,
                },
                new Text
                {
                    Id = 3,
                    Title = "Wheel of Time - New Spring",
                    Author = "Robert Jordan",
                    CoverURL =
                        "https://images-na.ssl-images-amazon.com/images/I/517MXt9nqnL._SX308_BO1,204,203,200_.jpg",
                    ISBN = "978-0765345455",
                    Genres = new string[] {"Fantasy"},
                    DateOfUpload = DateTime.UtcNow,
                }
            );

            builder.Entity<Alias>().HasData(
                new Alias
                {
                    Id = 1,
                    Name = "Kramer",
                    DateOfCreation = DateTime.UtcNow,
                    Points = 1631,
                    Time = 93304223,
                    Wpm = 85.55,
                    Accuracy = 97.11,
                    UserId = "1"
                },
                new Alias
                {
                    Id = 2,
                    Name = "Bob_Sacamano",
                    DateOfCreation = DateTime.UtcNow,
                    Points = 238,
                    Time = 1388820,
                    Wpm = 67.67,
                    Accuracy = 95.69,
                    UserId = "2"
                },
                new Alias
                {
                    Id = 3,
                    Name = "Bobby",
                    DateOfCreation = DateTime.UtcNow,
                    Points = 488,
                    Time = 2559302,
                    Wpm = 73.55,
                    Accuracy = 95.66,
                    UserId = "2"
                }
            );

            builder.Entity<Performance>().HasData(
                new Performance
                {
                    Id = 1,
                    AliasId = 1,
                    SectionId = 1,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = "",
                    Points = 67,
                },
                new Performance
                {
                    Id = 2,
                    AliasId = 1,
                    SectionId = 1,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 99,
                },
                new Performance
                {
                    Id = 3,
                    AliasId = 1,
                    SectionId = 2,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 258,
                },
                new Performance
                {
                    Id = 4,
                    AliasId = 1,
                    SectionId = 3,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 129,
                },
                new Performance
                {
                    Id = 5,
                    AliasId = 1,
                    SectionId = 4,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 84,
                },
                new Performance
                {
                    Id = 6,
                    AliasId = 1,
                    SectionId = 5,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 130,
                },
                new Performance
                {
                    Id = 7,
                    AliasId = 1,
                    SectionId = 6,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 33,
                },
                new Performance
                {
                    Id = 8,
                    AliasId = 1,
                    SectionId = 7,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 32,
                },
                new Performance
                {
                    Id = 9,
                    AliasId = 1,
                    SectionId = 8,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 43,
                },
                new Performance
                {
                    Id = 10,
                    AliasId = 1,
                    SectionId = 9,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 91,
                },
                new Performance
                {
                    Id = 11,
                    AliasId = 1,
                    SectionId = 1,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 298,
                },
                new Performance
                {
                    Id = 12,
                    AliasId = 1,
                    SectionId = 2,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 65,
                },
                new Performance
                {
                    Id = 13,
                    AliasId = 2,
                    SectionId = 3,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 123,
                },
                new Performance
                {
                    Id = 14,
                    AliasId = 2,
                    SectionId = 4,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 320,
                },
                new Performance
                {
                    Id = 15, AliasId = 3,
                    SectionId = 5,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 18,
                },
                new Performance
                {
                    Id = 16,
                    AliasId = 3,
                    SectionId = 6,
                    DateOfCompletion = DateTime.UtcNow,
                    ReplayData = " ",
                    Points = 430,
                }
            );

            builder.Entity<RawStats>().HasData(
                new RawStats
                {
                    Id = 1,
                    PerformanceId = 1,
                    Time = 900000,
                    CorrectKeypressCount = 450,
                    IncorrectKeypressCount = 30
                },
                new RawStats
                {
                    Id = 2,
                    PerformanceId = 1,
                    Time = 900000,
                    CorrectKeypressCount = 450,
                    IncorrectKeypressCount = 30
                },
                new RawStats
                {
                    Id = 3,
                    PerformanceId = 1,
                    Time = 58000,
                    CorrectKeypressCount = 80,
                    IncorrectKeypressCount = 8
                },
                new RawStats
                {
                    Id = 4,
                    PerformanceId = 1,
                    Time = 120000,
                    CorrectKeypressCount = 140,
                    IncorrectKeypressCount = 5
                },
                new RawStats
                {
                    Id = 5,
                    PerformanceId = 2,
                    Time = 240000,
                    CorrectKeypressCount = 1020,
                    IncorrectKeypressCount = 20
                },
                new RawStats
                {
                    Id = 19,
                    PerformanceId = 16,
                    Time = 3400000,
                    CorrectKeypressCount = 32000,
                    IncorrectKeypressCount = 1000
                },
                new RawStats
                {
                    Id = 18,
                    PerformanceId = 15,
                    Time = 730000,
                    CorrectKeypressCount = 12000,
                    IncorrectKeypressCount = 80
                },
                new RawStats
                {
                    Id = 17,
                    PerformanceId = 14,
                    Time = 520000,
                    CorrectKeypressCount = 3211,
                    IncorrectKeypressCount = 89
                },
                new RawStats
                {
                    Id = 16,
                    PerformanceId = 13,
                    Time = 420000,
                    CorrectKeypressCount = 3200,
                    IncorrectKeypressCount = 100
                },
                new RawStats
                {
                    Id = 15,
                    PerformanceId = 12,
                    Time = 1200,
                    CorrectKeypressCount = 80,
                    IncorrectKeypressCount = 10
                },
                new RawStats
                {
                    Id = 14,
                    PerformanceId = 11,
                    Time = 700000,
                    CorrectKeypressCount = 5000,
                    IncorrectKeypressCount = 0
                },
                new RawStats
                {
                    Id = 13,
                    PerformanceId = 10,
                    Time = 120000,
                    CorrectKeypressCount = 510,
                    IncorrectKeypressCount = 10
                },
                new RawStats
                {
                    Id = 12,
                    PerformanceId = 9,
                    Time = 1000000,
                    CorrectKeypressCount = 7888,
                    IncorrectKeypressCount = 311
                },
                new RawStats
                {
                    Id = 11,
                    PerformanceId = 8,
                    Time = 200000,
                    CorrectKeypressCount = 890,
                    IncorrectKeypressCount = 100
                },
                new RawStats
                {
                    Id = 10,
                    PerformanceId = 7,
                    Time = 240000,
                    CorrectKeypressCount = 1000,
                    IncorrectKeypressCount = 12
                },
                new RawStats
                {
                    Id = 9,
                    PerformanceId = 6,
                    Time = 320000,
                    CorrectKeypressCount = 2322,
                    IncorrectKeypressCount = 76
                },
                new RawStats
                {
                    Id = 8,
                    PerformanceId = 5,
                    Time = 480000,
                    CorrectKeypressCount = 3299,
                    IncorrectKeypressCount = 34
                },
                new RawStats
                {
                    Id = 7,
                    PerformanceId = 4,
                    Time = 180000,
                    CorrectKeypressCount = 1233,
                    IncorrectKeypressCount = 32,
                },
                new RawStats
                {
                    Id = 6,
                    PerformanceId = 3,
                    Time = 240000,
                    CorrectKeypressCount = 1020,
                    IncorrectKeypressCount = 20
                }
            );
        }
    }
}