import { InterviewCard } from "@/components/interview-card";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const Page = async () => {
  const user = await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews(user?.id!),
  ]);

  const hasPastInterivews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = latestInterviews?.length! > 0;

  return (
    <Fragment>
      <section className="card-cta">
        <div className="flex max-w-lg flex-col gap-6">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="mt-8 flex flex-col gap-6">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterivews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                interviewId={interview.id}
                userId={user?.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven't taken any interviews yet.</p>
          )}
        </div>
      </section>

      <section className="mt-8 flex flex-col gap-6">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                interviewId={interview.id}
                userId={user?.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>No upcoming interviews found.</p>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Page;
