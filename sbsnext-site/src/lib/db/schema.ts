import {
  pgTable,
  varchar,
  timestamp,
  json,
  uuid,
  text,
  primaryKey,
  foreignKey,
  boolean,
} from 'drizzle-orm/pg-core';

export const user = pgTable('User', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  createdAt: timestamp('createdAt').notNull(),
  clientIP: varchar('clientIP', { length: 64 }).notNull(),
});
export type User = typeof user.$inferSelect;

export const userContact = pgTable('UserContact', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  userId: uuid('userId')
      .notNull()
      .references(() => user.id),
  name: varchar('name', { length: 64 }),
  email: varchar('email', { length: 64 }),
  org: varchar('org', { length: 64 }),
  phone: varchar('phone', { length: 64 }),
  message: varchar('message', { length: 64 }),

  
});
export type UserContact = typeof userContact.$inferSelect;


export const chat = pgTable('Chat', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  createdAt: timestamp('createdAt').notNull(),
  title: text('title').notNull(),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id),
  visibility: varchar('visibility', { enum: ['public', 'private'] })
    .notNull()
    .default('private'),
});

export type Chat = typeof chat.$inferSelect;

export const message = pgTable('Message', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  chatId: uuid('chatId')
    .notNull()
    .references(() => chat.id),
  role: varchar('role').notNull(),
  content: json('content').notNull(),
  createdAt: timestamp('createdAt').notNull(),
});

export type Message = typeof message.$inferSelect;

export const vote = pgTable(
  'Vote',
  {
    chatId: uuid('chatId')
      .notNull()
      .references(() => chat.id),
    messageId: uuid('messageId')
      .notNull()
      .references(() => message.id),
    isUpvoted: boolean('isUpvoted').notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.chatId, table.messageId] })
  ],
);

export type Vote = typeof vote.$inferSelect;


export const document = pgTable(
  'Document',
  {
    id: uuid('id').notNull().defaultRandom(),
    createdAt: timestamp('createdAt').notNull(),
    title: text('title').notNull(),
    content: text('content'),
    kind: varchar('kind', { enum: ['text', 'code', 'image', 'sheet'] })
      .notNull()
      .default('text'),
    codeLanguage: varchar('codeLanguage', { enum: ['python', 'csharp'] }),
    userId: uuid('userId')
      .notNull()
      .references(() => user.id),
  },
  (table) => [
    primaryKey({ columns: [table.id, table.createdAt] })
  ],
);

export type Document = typeof document.$inferInsert;

export const suggestion = pgTable(
  'Suggestion',
  {
    id: uuid('id').notNull().defaultRandom(),
    documentId: uuid('documentId').notNull(),
    documentCreatedAt: timestamp('documentCreatedAt').notNull(),
    originalText: text('originalText').notNull(),
    suggestedText: text('suggestedText').notNull(),
    description: text('description'),
    isResolved: boolean('isResolved').notNull().default(false),
    userId: uuid('userId')
      .notNull()
      .references(() => user.id),
    createdAt: timestamp('createdAt').notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.id] }),
    foreignKey({
      columns: [table.documentId, table.documentCreatedAt],
      foreignColumns: [document.id, document.createdAt],
    })
  ],
);

export type Suggestion = typeof suggestion.$inferInsert;
