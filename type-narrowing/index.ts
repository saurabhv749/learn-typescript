// https://www.codecademy.com/courses/learn-typescript/projects/park-service-volunteer-apprciation-program

import {
  RaccoonMeadowsVolunteers,
  RaccoonMeadowsActivity,
  raccoonMeadowsVolunteers,
} from "./data/raccoon-meadows-log";

import {
  WolfPointVolunteers,
  WolfPointActivity,
  wolfPointVolunteers,
} from "./data/wolf-point-log";

type CombinedActivity = RaccoonMeadowsActivity | WolfPointActivity;

type Volunteers = {
  id: number | string;
  name: string;
  activities: CombinedActivity[];
};

function combineVolunteers(
  volunteers: (RaccoonMeadowsVolunteers | WolfPointVolunteers)[]
): RaccoonMeadowsVolunteers[] {
  return volunteers.map((volunteer) => {
    let id = volunteer.id;
    let activities: RaccoonMeadowsActivity[] = [];
    if (typeof id === "string") {
      // Volunteer from Wolf Point
      id = parseInt(id, 10);
      // Fix activity record
      activities = volunteer.activities.map(
        (activity): RaccoonMeadowsActivity => ({
          description: activity.notes,
          hours: activity.time,
          verified: activity.verified,
        })
      );
    }

    return { id, name: volunteer.name, activities };
  });
}

function isVerfied(verified: boolean | string) {
  if (typeof verified === "string") {
    return verified === "Yes" ? true : false;
  }
  return verified;
}

function getHours(activity: CombinedActivity) {
  if ("hours" in activity) {
    return activity.hours;
  }
  return activity.time;
}

function calculateHours(volunteers: Volunteers[]) {
  return volunteers.map((volunteer) => {
    let hours = 0;

    volunteer.activities.forEach((activity) => {
      if (isVerfied(activity.verified)) {
        hours += getHours(activity);
      }
    });

    return {
      id: volunteer.id,
      name: volunteer.name,
      hours: hours,
    };
  });
}

function byHours(a, b) {
  return b.hours - a.hours;
}

const combinedVolunteers = combineVolunteers([
  ...raccoonMeadowsVolunteers,
  ...wolfPointVolunteers,
]);

const result = calculateHours(combinedVolunteers);
console.log(result.sort(byHours));
