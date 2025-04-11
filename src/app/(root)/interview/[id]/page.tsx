import { Agent } from "@/components/agent";
import { TechIcons } from "@/components/tech-icons";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getRandomInterviewCover } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Fragment } from "react";

const InterviewPage = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();
  const interview = await getInterviewById(id);

  if (!interview) {
    redirect("/");
  }

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <Fragment>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row items-center gap-4 max-sm:flex-col">
          <div className="flex flex-row items-center gap-4">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="size-[40px] rounded-full object-cover"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>

          <TechIcons techStack={interview.techstack} />
        </div>

        <p className="bg-dark-200 h-fit rounded-lg px-4 py-2 capitalize">
          {interview.type}
        </p>
      </div>

      <Agent
        feedbackId={feedback?.id}
        interviewId={id}
        questions={interview.questions}
        type="interview"
        userId={user?.id}
        userName={user?.name!}
      />
    </Fragment>
  );
};

export default InterviewPage;
