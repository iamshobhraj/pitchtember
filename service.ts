const kv = await Deno.openKv();

type Event = {
  id: string;
  title: string;
  content: string;
}

export const EmptyEvent = {
  id: "",
  title: "",
  content: "",
}

export async function searchEvents(key: string) {
  const posts = await getEvents()
  return posts
  .filter(it => it.title.indexOf(key) > -1)
}

export async function getEvent(id: string) {
  return (await kv.get(["posts", id])).value;
}

export async function getEvents() {
  const posts = [] as Event[];

  const entries = kv.list({ prefix: ["posts"] });
  for await (const entry of entries) {
    posts.push(entry.value);
  }

  return posts;
}

export async function createEvent(post: Partial<Event>) {
  const id = crypto.randomUUID();
  kv.set(["posts", id], {...post, id});
}

export async function updateEvent(data: Partial<Event>) {
  const post = await getEvent(data.id!);
  post.title = data.title ?? "";
  post.content = data.content ?? "";
  kv.set(["posts", data.id!], {...post});
}

export async function deleteEvent(id: string) {
  kv.delete(["posts", id]);
}
