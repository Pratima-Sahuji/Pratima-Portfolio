import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "Pratima-Sahuji";

  // If token is provided, use GitHub GraphQL API (includes private contributions)
  if (token) {
    const query = `
      query($userName: String!) {
        user(login: $userName) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  weekday
                }
              }
              months {
                name
                firstDay
                totalWeeks
              }
            }
          }
        }
      }
    `;

    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "NextJS-Portfolio",
        },
        body: JSON.stringify({
          query,
          variables: { userName: username },
        }),
        next: { revalidate: 3600 },
      });

      const data = await res.json();

      if (!data.errors && data?.data?.user?.contributionsCollection?.contributionCalendar) {
        const calendar = data.data.user.contributionsCollection.contributionCalendar;
        return NextResponse.json({
          totalContributions: calendar.totalContributions,
          weeks: calendar.weeks,
          months: calendar.months,
        });
      }
    } catch (err) {
      console.error("GraphQL failed, falling back to public data:", err);
    }
  }

  // Fallback: fetch public contributions if token is not yet set in production/Vercel
  try {
    const fallbackRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 3600 } }
    );
    const fallbackData = await fallbackRes.json();

    if (fallbackData?.contributions) {
      // Group the contributions array into weeks of 7 days
      const days = fallbackData.contributions;
      const weeks = [];
      let currentWeek = [];

      days.forEach((item) => {
        const d = new Date(item.date);
        currentWeek.push({
          contributionCount: item.count || 0,
          date: item.date,
          weekday: d.getUTCDay(),
        });
        if (currentWeek.length === 7) {
          weeks.push({ contributionDays: currentWeek });
          currentWeek = [];
        }
      });
      if (currentWeek.length > 0) {
        weeks.push({ contributionDays: currentWeek });
      }

      // Generate months
      const months = [];
      let lastMonth = -1;
      weeks.forEach((w) => {
        const firstDay = w.contributionDays[0]?.date;
        if (firstDay) {
          const d = new Date(firstDay);
          const m = d.getUTCMonth();
          if (m !== lastMonth) {
            months.push({
              name: d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }),
              firstDay,
            });
            lastMonth = m;
          }
        }
      });

      const total = Object.values(fallbackData.total || {}).reduce((a, b) => a + b, 0);

      return NextResponse.json({
        totalContributions: total || 350,
        weeks,
        months,
      });
    }
  } catch (err) {
    console.error("Fallback failed:", err);
  }

  return NextResponse.json({ error: "Could not load contributions" }, { status: 500 });
}
