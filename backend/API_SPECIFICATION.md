# API SPECIFICATION

## Prisma Database Models

```prisma
model User {
  id              Int      @id @default(autoincrement())
  email           String   @unique
  name            String?
  password        String
  role            String   @default("USER")
  isEmailVerified Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  tokens          Token[]
}

model Token {
  id          Int       @id @default(autoincrement())
  token       String
  type        String
  expires     DateTime
  blacklisted Boolean
  createdAt   DateTime  @default(now())
  user        User      @relation(fields: [userId], references: [id])
  userId      Int
}

model Feature {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  icon        String
  color       String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ContactForm {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  subject   String
  message   String
  createdAt DateTime @default(now())
}
```

## API Endpoints

### Authentication Endpoints

---

EP: POST /auth/register
DESC: Register a new user account.
IN: body:{name:str!, email:str!, password:str!}
OUT: 201:{user:obj{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}, tokens:obj{access:obj{token:str, expires:str}, refresh:obj{token:str, expires:str}}}
ERR: {"400":"Duplicate email or validation error", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/register -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
EX_RES_201: {"user":{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":false,"createdAt":"2025-11-12T10:30:45Z","updatedAt":"2025-11-12T10:30:45Z"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIs...","expires":"2025-11-12T10:45:45Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIs...","expires":"2025-11-19T10:30:45Z"}}}

---

EP: POST /auth/login
DESC: Authenticate user with email and password.
IN: body:{email:str!, password:str!}
OUT: 200:{user:obj{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}, tokens:obj{access:obj{token:str, expires:str}, refresh:obj{token:str, expires:str}}}
ERR: {"401":"Invalid email or password", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/login -H "Content-Type: application/json" -d '{"email":"john@example.com","password":"password123"}'
EX_RES_200: {"user":{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-11-12T10:30:45Z","updatedAt":"2025-11-12T10:30:45Z"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIs...","expires":"2025-11-12T10:45:45Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIs...","expires":"2025-11-19T10:30:45Z"}}}

---

EP: POST /auth/logout
DESC: Logout user and blacklist refresh token.
IN: body:{refreshToken:str!}
OUT: 204:{}
ERR: {"404":"Refresh token not found", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/logout -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIs..."}'
EX_RES_204: {}

---

EP: POST /auth/refresh-tokens
DESC: Refresh access token using refresh token.
IN: body:{refreshToken:str!}
OUT: 200:{access:obj{token:str, expires:str}, refresh:obj{token:str, expires:str}}
ERR: {"401":"Invalid refresh token", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/refresh-tokens -H "Content-Type: application/json" -d '{"refreshToken":"eyJhbGciOiJIUzI1NiIs..."}'
EX_RES_200: {"access":{"token":"eyJhbGciOiJIUzI1NiIs...","expires":"2025-11-12T10:45:45Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIs...","expires":"2025-11-19T10:30:45Z"}}

---

EP: POST /auth/forgot-password
DESC: Send password reset email to user.
IN: body:{email:str!}
OUT: 204:{}
ERR: {"404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/forgot-password -H "Content-Type: application/json" -d '{"email":"john@example.com"}'
EX_RES_204: {}

---

EP: POST /auth/reset-password
DESC: Reset user password using token.
IN: query:{token:str!}, body:{password:str!}
OUT: 204:{}
ERR: {"401":"Invalid or expired token", "500":"Internal server error"}
EX_REQ: curl -X POST "/auth/reset-password?token=reset-token-123" -H "Content-Type: application/json" -d '{"password":"newpassword123"}'
EX_RES_204: {}

---

EP: POST /auth/verify-email
DESC: Verify user email using token.
IN: query:{token:str!}
OUT: 204:{}
ERR: {"401":"Invalid or expired token", "500":"Internal server error"}
EX_REQ: curl -X POST "/auth/verify-email?token=verify-token-123"
EX_RES_204: {}

---

EP: POST /auth/send-verification-email
DESC: Send email verification to authenticated user.
IN: headers:{Authorization:str!}
OUT: 204:{}
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X POST /auth/send-verification-email -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
EX_RES_204: {}

### User Management Endpoints

---

EP: POST /users
DESC: Create a new user (admin only).
IN: headers:{Authorization:str!}, body:{name:str!, email:str!, password:str!, role:str!}
OUT: 201:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Duplicate email or validation error", "401":"Unauthorized", "403":"Forbidden", "500":"Internal server error"}
EX_REQ: curl -X POST /users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." -H "Content-Type: application/json" -d '{"name":"Jane Smith","email":"jane@example.com","password":"password123","role":"USER"}'
EX_RES_201: {"id":2,"email":"jane@example.com","name":"Jane Smith","role":"USER","isEmailVerified":false,"createdAt":"2025-11-12T10:30:45Z","updatedAt":"2025-11-12T10:30:45Z"}

---

EP: GET /users
DESC: Get paginated list of users with optional filters.
IN: headers:{Authorization:str!}, query:{name:str, role:str, sortBy:str, limit:int, page:int}
OUT: 200:{results:arr[obj{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}], page:int, limit:int, totalPages:int, totalResults:int}
ERR: {"401":"Unauthorized", "403":"Forbidden", "500":"Internal server error"}
EX_REQ: curl -X GET "/users?page=1&limit=10&role=USER" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
EX_RES_200: {"results":[{"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-11-12T10:30:45Z","updatedAt":"2025-11-12T10:30:45Z"}],"page":1,"limit":10,"totalPages":1,"totalResults":1}

---

EP: GET /users/{userId}
DESC: Get specific user by ID.
IN: headers:{Authorization:str!}, params:{userId:int!}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"401":"Unauthorized", "403":"Forbidden", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X GET /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Doe","role":"USER","isEmailVerified":true,"createdAt":"2025-11-12T10:30:45Z","updatedAt":"2025-11-12T10:30:45Z"}

---

EP: PATCH /users/{userId}
DESC: Update specific user information.
IN: headers:{Authorization:str!}, params:{userId:int!}, body:{name:str, email:str, password:str}
OUT: 200:{id:int, email:str, name:str, role:str, isEmailVerified:bool, createdAt:str, updatedAt:str}
ERR: {"400":"Duplicate email or validation error", "401":"Unauthorized", "403":"Forbidden", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X PATCH /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." -H "Content-Type: application/json" -d '{"name":"John Updated"}'
EX_RES_200: {"id":1,"email":"john@example.com","name":"John Updated","role":"USER","isEmailVerified":true,"createdAt":"2025-11-12T10:30:45Z","updatedAt":"2025-11-12T10:35:45Z"}

---

EP: DELETE /users/{userId}
DESC: Delete specific user account.
IN: headers:{Authorization:str!}, params:{userId:int!}
OUT: 200:{}
ERR: {"401":"Unauthorized", "403":"Forbidden", "404":"User not found", "500":"Internal server error"}
EX_REQ: curl -X DELETE /users/1 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
EX_RES_200: {}

### Content Endpoints

---

EP: GET /api/features
DESC: Get list of application features.
IN: {}
OUT: 200:{features:arr[obj{id:str, title:str, description:str, icon:str, color:str}]}
ERR: {"500":"Internal server error"}
EX_REQ: curl -X GET /api/features
EX_RES_200: {"features":[{"id":"1","title":"Fast Performance","description":"Lightning fast application performance","icon":"zap","color":"blue"},{"id":"2","title":"Secure","description":"Enterprise-grade security features","icon":"shield","color":"green"}]}

---

EP: POST /api/contact
DESC: Submit contact form message.
IN: body:{name:str!, email:str!, subject:str!, message:str!}
OUT: 200:{success:bool, message:str}
ERR: {"400":"Validation error", "500":"Internal server error"}
EX_REQ: curl -X POST /api/contact -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","subject":"Question","message":"I have a question about your service."}'
EX_RES_200: {"success":true,"message":"Thank you for your message! We'll get back to you soon."}

### MCP (Model Context Protocol) Endpoints

---

EP: POST /mcp
DESC: Handle MCP POST requests with authentication.
IN: headers:{Authorization:str!}, body:obj
OUT: 200:obj
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X POST /mcp -H "Authorization: Bearer mcp-token" -H "Content-Type: application/json" -d '{}'
EX_RES_200: {}

---

EP: GET /mcp
DESC: Handle MCP GET requests with authentication.
IN: headers:{Authorization:str!}
OUT: 200:obj
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X GET /mcp -H "Authorization: Bearer mcp-token"
EX_RES_200: {}

---

EP: DELETE /mcp
DESC: Handle MCP DELETE requests with authentication.
IN: headers:{Authorization:str!}
OUT: 200:obj
ERR: {"401":"Unauthorized", "500":"Internal server error"}
EX_REQ: curl -X DELETE /mcp -H "Authorization: Bearer mcp-token"
EX_RES_200: {}