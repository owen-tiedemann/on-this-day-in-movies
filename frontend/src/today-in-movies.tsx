import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Skeleton,
  Text,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import useAxios from "axios-hooks";
import { ReactNode, useState } from "react";

const SkeletonBlock = ({
  falling,
  delay,
}: {
  falling: boolean;
  delay: number;
}) => (
  <Skeleton
    height={140}
    radius="md"
    animate={false}
    style={{
      transform: falling ? "translateY(100vh)" : "translateY(0)",
      transition: `transform 600ms cubic-bezier(0.4, 0, 1, 1) ${delay}ms`,
    }}
  />
);

const FallingTextBlock = ({
  falling,
  delay,
  children,
}: {
  falling: boolean;
  delay: number;
  children: ReactNode;
}) => {
  return (
    <Box
      style={{
        transform: falling ? "translateY(100vh)" : "translateY(0)",
        transition: `transform 600ms cubic-bezier(0.4, 0, 1, 1) ${delay}ms`,
      }}
    >
      {children}
    </Box>
  );
};
interface MovieDate {
  movie: string;
  date: string;
  description: string;
}

const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(Number(year), Number(month) - 1, Number(day)));
};

export const TodayInMovies = () => {
  const [todayResponse] = useAxios<MovieDate[]>({
    url: `https://seal-app-x2cd7.ondigitalocean.app/movie-date?month=${new Date().getMonth() + 1}&day=${new Date().getDate()}`,
    method: "GET",
  });

  const [postResponse, requestDate] = useAxios<MovieDate[]>(
    {
      method: "GET",
    },
    { manual: true },
  );

  const [value, setValue] = useState<string | null>(null);

  const onSubmit = () => {
    const month = value ? Number(value.split("-")[1]) : null;
    const day = value ? Number(value.split("-")[2]) : null;

    requestDate(
      `https://seal-app-x2cd7.ondigitalocean.app/movie-date?month=${month}&day=${day}`,
    );
  };

  const [betterView, setBetterView] = useState(false);
  const [falling, setFalling] = useState(false);

  const handleGo = () => {
    setFalling(true);

    setTimeout(() => {
      console.log("here");
      setBetterView(true);
    }, 3000);
  };

  return (
    <Container>
      {betterView ? (
<Container
  size="lg"
  style={{
    paddingTop: 30,
    paddingBottom: 50,
    fontFamily: "Arial, Helvetica, sans-serif",
  }}
>
  {/* Main "website" */}
  <div
    style={{
      background: "#e8e8e8",
      border: "4px ridge #ffffff",
      boxShadow: "8px 8px 0 #111",
    }}
  >
    {/* Header */}
    <div
      style={{
        background:
          "linear-gradient(to bottom, #003f8f 0%, #001b4d 45%, #000b27 100%)",
        borderBottom: "3px solid #000",
        padding: "18px 20px 14px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#ffff00",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "clamp(2.2rem, 6vw, 4rem)",
          fontWeight: "bold",
          fontStyle: "italic",
          textShadow: "3px 3px #000",
          letterSpacing: "-2px",
        }}
      >
        ★ TODAY IN MOVIES! ★
      </div>

      <div
        style={{
          color: "#ffffff",
          fontFamily: "'Times New Roman', serif",
          fontSize: 18,
          marginTop: 4,
        }}
      >
        Your Daily Dose of Movie History
      </div>
    </div>

    {/* Fake navigation bar */}
    <div
      style={{
        background: "#c0c0c0",
        borderBottom: "2px solid #666",
        padding: "6px 10px",
        display: "flex",
        justifyContent: "center",
        gap: 6,
        flexWrap: "wrap",
      }}
    >
      {["HOME", "MOVIES", "THIS DAY", "ARCHIVES", "ABOUT"].map((item) => (
        <div
          key={item}
          style={{
            background: "#dcdcdc",
            borderTop: "2px solid #fff",
            borderLeft: "2px solid #fff",
            borderRight: "2px solid #444",
            borderBottom: "2px solid #444",
            padding: "3px 12px",
            fontSize: 12,
            fontWeight: "bold",
            color: "#000080",
            cursor: "pointer",
          }}
        >
          {item}
        </div>
      ))}
    </div>

    {/* Content */}
    <div
      style={{
        padding: "24px 28px 30px",
        background: "#f4f4f4",
      }}
    >
      <Grid gap={25}>
        {/* Date */}
        <Grid.Col span={12}>
          <div
            style={{
              textAlign: "center",
              borderBottom: "3px double #000080",
              paddingBottom: 12,
            }}
          >
            <div
              style={{
                color: "#000080",
                fontFamily: "'Times New Roman', serif",
                fontSize: 28,
                fontWeight: "bold",
              }}
            >
              {new Date().toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>

            <div
              style={{
                color: "#666",
                fontSize: 12,
                fontStyle: "italic",
                marginTop: 4,
              }}
            >
              ✦ FEATURED MOVIE OF THE DAY ✦
            </div>
          </div>
        </Grid.Col>

        {/* Today's movie */}
        <Grid.Col span={12}>
          <div
            style={{
              border: "3px ridge #aaa",
              background: "#fff",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(to right, #000080, #174ea6, #000080)",
                color: "#fff",
                padding: "5px 10px",
                fontFamily: "'Times New Roman', serif",
                fontWeight: "bold",
                fontSize: 18,
                textShadow: "1px 1px #000",
              }}
            >
              ► ON THIS DAY IN MOVIE HISTORY
            </div>

            <div
              style={{
                padding: "20px 22px",
              }}
            >
              <Grid gap="xl">
                <Grid.Col span={{ base: 12, sm: 5 }}>
                  <div
                    style={{
                      background: "#000",
                      border: "5px ridge #888",
                      padding: 18,
                      minHeight: 130,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        color: "#ffff00",
                        fontFamily: "'Times New Roman', serif",
                        fontSize: 28,
                        fontWeight: "bold",
                        textShadow: "2px 2px #800000",
                      }}
                    >
                      {todayResponse.data?.[0].movie}
                    </div>
                  </div>
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 7 }}>
                  <Text
                    style={{
                      color: "#111",
                      fontFamily: "Arial, sans-serif",
                      fontSize: 16,
                      lineHeight: 1.6,
                    }}
                  >
                    {todayResponse.data?.[0].description}
                  </Text>
                </Grid.Col>
              </Grid>
            </div>
          </div>
        </Grid.Col>

        {/* Search */}
        <Grid.Col span={12}>
          <div
            style={{
              background: "#ffffcc",
              border: "2px solid #999900",
              padding: "14px 18px",
              textAlign: "center",
              boxShadow: "inset 0 0 0 1px #fff",
            }}
          >
            <div
              style={{
                color: "#800000",
                fontFamily: "'Times New Roman', serif",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              ★ LOOK UP ANOTHER DATE ★
            </div>

            <Flex
              align="flex-end"
              justify="center"
              gap="sm"
              style={{
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              <DatePickerInput
                label="Select a date"
                placeholder="Pick month and day"
                valueFormat="MMMM D"
                defaultLevel="month"
                maxLevel="month"
                value={value}
                onChange={setValue}
                style={{
                  flex: 1,
                }}
              />

              <Button
                onClick={() => onSubmit()}
                style={{
                  height: 36,
                  borderRadius: 0,
                  background:
                    "linear-gradient(to bottom, #ffffff 0%, #d4d4d4 48%, #999 100%)",
                  color: "#000",
                  border: "2px outset #fff",
                  fontWeight: "bold",
                  paddingLeft: 20,
                  paddingRight: 20,
                  boxShadow: "none",
                }}
              >
                GO!
              </Button>
            </Flex>
          </div>
        </Grid.Col>

        {/* Historical date */}
        {postResponse.data && (
          <Grid.Col span={12}>
            <div
              style={{
                textAlign: "center",
                margin: "5px 0",
              }}
            >
              <span
                style={{
                  color: "#800000",
                  fontFamily: "'Times New Roman', serif",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {formatDate(postResponse.data?.[0].date)}
              </span>
            </div>

            <div
              style={{
                border: "3px ridge #aaa",
                background: "#fff",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(to right, #800000, #b00000, #800000)",
                  color: "#fff",
                  padding: "5px 10px",
                  fontFamily: "'Times New Roman', serif",
                  fontWeight: "bold",
                  fontSize: 18,
                  textShadow: "1px 1px #000",
                }}
              >
                ► MOVIE HISTORY ARCHIVES
              </div>

              <div style={{ padding: "20px 22px" }}>
                <Grid gap="xl">
                  <Grid.Col span={{ base: 12, sm: 5 }}>
                    <div
                      style={{
                        border: "5px ridge #888",
                        background: "#111",
                        padding: 18,
                        minHeight: 130,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "#fff",
                          fontFamily: "'Times New Roman', serif",
                          fontSize: 28,
                          fontWeight: "bold",
                        }}
                      >
                        {postResponse.data?.[0].movie}
                      </div>
                    </div>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 7 }}>
                    <Text
                      style={{
                        color: "#111",
                        fontFamily: "Arial, sans-serif",
                        fontSize: 16,
                        lineHeight: 1.6,
                      }}
                    >
                      {postResponse.data?.[0].description}
                    </Text>
                  </Grid.Col>
                </Grid>
              </div>
            </div>
          </Grid.Col>
        )}

        {/* Footer */}
        <Grid.Col span={12}>
          <div
            style={{
              borderTop: "3px double #000080",
              paddingTop: 15,
              textAlign: "center",
              fontFamily: "'Times New Roman', serif",
              fontSize: 12,
              color: "#555",
            }}
          >
            <div
              style={{
                color: "#000080",
                fontWeight: "bold",
              }}
            >
              TODAY IN MOVIES
            </div>

            <div style={{ marginTop: 5 }}>
              Best viewed in Internet Explorer 6.0 at 1024 × 768
            </div>

            <div
              style={{
                marginTop: 8,
                color: "#800000",
                fontWeight: "bold",
              }}
            >
              ★ Thanks for visiting! ★
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  </div>
</Container>
      ) : (
        <Grid>
          <Grid.Col span={{ base: 12, xs: 4 }}>
            <FallingTextBlock falling={falling} delay={0}>
              Today in Movies!
            </FallingTextBlock>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 8 }}>
            <FallingTextBlock falling={falling} delay={1500}>
              Today is{" "}
              {new Date().toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </FallingTextBlock>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 8 }}>
            <FallingTextBlock falling={falling} delay={0}>
              {todayResponse.data?.[0].movie}
            </FallingTextBlock>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 4 }}>
            <FallingTextBlock falling={falling} delay={0}>
              {todayResponse.data?.[0].date &&
                formatDate(todayResponse.data?.[0].date)}
            </FallingTextBlock>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3 }}>
            <FallingTextBlock falling={falling} delay={0}>
              {todayResponse.data?.[0].description}
            </FallingTextBlock>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3 }}>
            <SkeletonBlock falling={falling} delay={1280} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6 }}>
            <SkeletonBlock falling={falling} delay={640} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 8 }}>
            <SkeletonBlock falling={falling} delay={320} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 4 }}>
            <SkeletonBlock falling={falling} delay={160} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3 }}>
            <SkeletonBlock falling={falling} delay={80} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3 }}>
            <FallingTextBlock falling={falling} delay={0}>
              <Flex align="flex-end" gap="md">
                <DatePickerInput
                  label="Try a different date!"
                  placeholder="Pick month and day"
                  valueFormat="MMMM D"
                  defaultLevel="month"
                  maxLevel="month"
                  value={value}
                  onChange={setValue}
                />
                <Button onClick={() => onSubmit()}>Go!</Button>
              </Flex>
            </FallingTextBlock>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6 }}></Grid.Col>
          <Grid.Col span={{ base: 12, xs: 8 }}>
            <SkeletonBlock falling={falling} delay={40} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 4 }}>
            <SkeletonBlock falling={falling} delay={20} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 8 }}>
            <FallingTextBlock falling={falling} delay={0}>
              {postResponse.data?.[0].movie}
            </FallingTextBlock>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 4 }}>
            <FallingTextBlock falling={falling} delay={0}>
              {postResponse.data?.[0].date &&
                formatDate(postResponse.data?.[0].date)}
            </FallingTextBlock>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3 }}>
            <FallingTextBlock falling={falling} delay={0}>
              {postResponse.data?.[0].description}
            </FallingTextBlock>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3 }}>
            <SkeletonBlock falling={falling} delay={10} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3 }}>
            <FallingTextBlock falling={falling} delay={0}>
              <Button onClick={() => handleGo()}>
                What's with all the squares?
              </Button>
            </FallingTextBlock>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6 }}>
            <SkeletonBlock falling={falling} delay={0} />
          </Grid.Col>
        </Grid>
      )}
    </Container>
  );
};
