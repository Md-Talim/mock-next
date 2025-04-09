import { Agent } from "@/components/agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { Fragment } from "react";

const InterviewPage = async () => {
  const user = await getCurrentUser();

  return (
    <Fragment>
      <h3>Interview Generation</h3>

      <Agent userName={user?.name!} userId={user?.id} type="generate" />
    </Fragment>
  );
};

export default InterviewPage;
