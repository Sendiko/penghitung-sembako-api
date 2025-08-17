import sequelize from "../models/index";

export async function withTransaction<T>(fn: (t: any) => Promise<T>): Promise<T> {
  const t = await sequelize.transaction();
  try {
    const result = await fn(t);
    await t.commit();
    return result;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}
