import { getXataClient, type DatabaseSchema } from "../xata";
import { Kysely } from "kysely";
import { XataDialect, type Model } from "@xata.io/kysely";

export const xata = getXataClient();
export const db = new Kysely<Model<DatabaseSchema>>({
    dialect: new XataDialect({ xata }),
});

export const getProject = async(id: string) => {
    const project = await db.selectFrom("projects")
        .innerJoin("projects_tags", "projects.id", "projects_tags.project_id")
        .selectAll()
        .where("projects.id", "=", id)
        .execute();

    console.log(project);

    return project;
}