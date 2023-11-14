import { Router, Context, send } from "./deps.ts";
import { getEvent, EmptyEvent, getEvents, createEvent, updateEvent, deleteEvent, searchEvents } from "./service.ts";

async function getEventHandler(ctx: Context) {
  ctx.render("events.html", {
    events: await getEvents()
  });
}

async function searchEventsHandler(ctx: Context) {
  const key = ctx.request.url.searchParams.get("key");
  ctx.render("events.html", {
    events: await searchEvents(key ?? "")
  })
}

async function createEventHandler(ctx: Context) {
  const body = await ctx.request.body().value;
  const id = body.get("id");
  const title = body.get("title");
  const content = body.get("content");

  if (id) {
    await updateEvent({id, title, content});
  } else {
    await createEvent({title, content});
  }

  ctx.render("events.html", {
    events: await getEvents()
  });
}

async function deleteEventHandler(ctx: Context) {
  const {id} = ctx.params;
  await deleteEvent(id);
  ctx.render("events.html", {
    events: await getEvents()
  });
}

async function eventFormHandler(ctx: Context) {
  const {id} = ctx.params;
  const event = id ? await getEvent(id) : EmptyEvent;
  ctx.render("event-form.html", event);
}

async function cssHandler(ctx: Context) {
  await send(ctx, "/main.css", {
    root: `${Deno.cwd()}/styles`,
    index: "main.css",
  });
}

async function imgHandler(ctx: Context) {
  await send(ctx, "/hero.png", {
    root: `${Deno.cwd()}/img`,
    index: "hero.png",
  });
}

export default new Router()
  .get("/", ctx => ctx.render("index.html"))
  .get("/search", searchEventsHandler)
  .get("/events", getEventHandler)
  .get("/events/form/:id?", eventFormHandler)

  .post("/events", createEventHandler)
  .delete("/events/:id", deleteEventHandler)

  .get("/main.css", cssHandler)
  .get("/hero.png", imgHandler);
