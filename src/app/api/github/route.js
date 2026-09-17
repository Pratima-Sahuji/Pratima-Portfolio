import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "Pratima-Sahuji";

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN is not configured" },
      { status: 500 }
    );
  }

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
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    const data = await res.json();

    if (data.errors) {
      console.error("GitHub GraphQL Errors:", data.errors);
      return NextResponse.json({ error: data.errors[0]?.message || "GraphQL error" }, { status: 400 });
    }

    const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json({ error: "Could not retrieve calendar" }, { status: 404 });
    }

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
      months: calendar.months,
    });
  } catch (err) {
    console.error("Failed to fetch GitHub contributions:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
