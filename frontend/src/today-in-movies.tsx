import { Button, Container, Flex, Grid, Group, Skeleton } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import useAxios from "axios-hooks";
import { useState } from "react";

const child = <Skeleton height={140} radius="md" animate={false} />;

interface MovieDate {
  movie: string;
  date: string;
  description: string;
}

export const TodayInMovies = () => {
  const [getResponse] = useAxios<MovieDate[]>(
    "https://seal-app-x2cd7.ondigitalocean.app/movie-dates",
  );

  const [postResponse, requestDate] = useAxios<MovieDate[]>(
    {
      url: "http://localhost:8080/",
      method: "GET",
    },
    { manual: true },
  );

  const [value, setValue] = useState<string | null>(null);

  const onSubmit = () => {
    const month = value ? Number(value.split("-")[1]) : null;
    const day = value ? Number(value.split("-")[2]) : null;

    requestDate(`https://seal-app-x2cd7.ondigitalocean.app/movie-date?month=${month}&day=${day}`);
  };

  return (
    <Container>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 4 }}>Today in Movies!</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>
          Today is{" "}
          {new Date().toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>
          {getResponse.data?.[0].movie}
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          {getResponse.data?.[0].date &&
            new Date(getResponse.data?.[0].date).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>
          {getResponse.data?.[0].description}
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>
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
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}></Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>
          {postResponse.data?.[0].movie}
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          {postResponse.data?.[0].date &&
            new Date(postResponse.data?.[0].date).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>
          {postResponse.data?.[0].description}
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col>
      </Grid>
    </Container>
  );
};
