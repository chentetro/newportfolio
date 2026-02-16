# 🎯 Chatbot Implementation - Progress Tracker

## 📋 Project Overview

**Objective**: Implement a chatbot feature that answers questions about Chen's content (profile, experience, skills, projects, interests) using a system prompt approach with Claude 3.5 Sonnet via Vercel AI Gateway. The chatbot will be accessible site-wide via a floating widget button.

**Context**: This portfolio currently displays content across multiple pages (home, about, projects). Adding a chatbot will provide an interactive way for visitors to ask questions about Chen's background, experience, skills, projects, and interests. The system prompt approach provides a fast path to shipping, with RAG (Retrieval-Augmented Generation) planned for a future phase to enable more accurate answers with source citations.

**Status**: 🔄 In Progress | **Phase**: 1 of 4 | **Progress**: 8% (1/12 steps)

**Success Metrics**:

- Chatbot answers questions about Chen's content accurately
- System prompt includes all content from: home.ts, about.ts, projects.ts, interests.ts, life.ts, social.ts, and experience markdown files
- Chat UI is accessible (WCAG AA compliant) with proper ARIA labels
- Streaming responses work smoothly
- Chat widget is available site-wide via layout integration
- All tests pass (unit + integration)
- Component follows monochrome design system
- Responsive design works on mobile (375px+) and desktop

**Timeline**:

- **Phase 1**: Project Setup & Dependencies (30 minutes)
- **Phase 2**: System Prompt Builder (1-2 hours)
- **Phase 3**: Chat API Route (1 hour)
- **Phase 4**: Chat UI & Widget (2-3 hours)

**Scope**:

- ✅ System prompt builder that reads all content files
- ✅ Chat API route with streaming support
- ✅ Chat widget UI (floating button, modal dialog)
- ✅ Markdown rendering for assistant messages
- ✅ Input validation and character limits
- ✅ Comprehensive test coverage
- ✅ Accessible design (keyboard navigation, ARIA labels)
- ✅ Dark mode support
- ✅ Integration into `app/layout.tsx`
- ⏳ Rate limiting and usage monitoring (Future Phase)
- ⏳ RAG enhancement for source citations (Future Phase)

## 🎯 Implementation Plan

### Phase Breakdown

**Phase 1: Project Setup & Dependencies**

- Install required packages (ai, @ai-sdk/react, react-markdown)
- Verify project structure
- Set up development environment notes

**Phase 2: System Prompt Builder**

- Create `app/lib/system-prompt.ts`
- Read content from all content files
- Format content into readable system prompt
- Include instructions for LLM

**Phase 3: Chat API Route**

- Create `app/api/chat/route.ts`
- Implement streaming with Vercel AI SDK
- Add input validation
- Error handling

**Phase 4: Chat UI & Widget**

- Create `app/components/Chat.tsx`
- Create `app/components/ChatWidget.tsx`
- Create `app/components/MarkdownRenderer.tsx`
- Integrate into layout
- Add comprehensive tests

### Dependencies

- **STEP-001** → **STEP-002** → **STEP-003** → **STEP-004** → **STEP-005** → **STEP-006** → **STEP-007** → **STEP-008** → **STEP-009** → **STEP-010** → **STEP-011** → **STEP-012**

### Risk Assessment

**Low Risk**:

- Content structure is well-defined
- Vercel AI Gateway handles authentication automatically
- System prompt approach is straightforward

**Medium Risk**:

- Token costs if not rate-limited (mitigated by input validation)
- Streaming implementation complexity (mitigated by Vercel AI SDK)

**Mitigation Strategies**:

- Input validation limits message count and character length
- Clear error messages for authentication issues
- Comprehensive testing at each phase

### Testing Strategy

**Unit Tests**:

- System prompt builder generates correct content
- Chat component handles user interactions
- ChatWidget toggles correctly
- MarkdownRenderer formats content properly

**Integration Tests**:

- Full chat flow (question → answer)
- Error handling scenarios
- Accessibility compliance

**Manual Testing**:

- Test various questions about Chen's content
- Verify streaming works smoothly
- Test keyboard navigation
- Test mobile responsiveness

## ✅ Progress Tracking

### ✅ Completed Steps

- [x] **STEP-001**: Install required dependencies ✅
  - Completed: Phase 1, STEP-001
  - Notes: Installed ai (^6.0.86), @ai-sdk/react (^3.0.88), and react-markdown (^10.1.0) packages. All packages exceed minimum version requirements. TypeScript compilation passes with no errors.

### 🔄 In Progress

_No steps in progress yet._

### ⏳ Pending Steps

- [ ] **STEP-002**: Create system prompt builder structure
- [ ] **STEP-003**: Read and format home content
- [ ] **STEP-004**: Read and format about content
- [ ] **STEP-005**: Read and format projects content
- [ ] **STEP-006**: Read and format experience content
- [ ] **STEP-007**: Read and format interests and life content
- [ ] **STEP-008**: Create Chat API route
- [ ] **STEP-009**: Create Chat component
- [ ] **STEP-010**: Create MarkdownRenderer component
- [ ] **STEP-011**: Create ChatWidget component
- [ ] **STEP-012**: Integrate ChatWidget into layout and add tests

## 📝 Detailed Steps

### **STEP-001**: Install required dependencies

**Description**: Install Vercel AI SDK packages and react-markdown for chatbot functionality.

**Files to Modify**:

- `package.json`

**Implementation Details**:

- Install `ai` package (Vercel AI SDK): `npm install ai`
- Install `@ai-sdk/react` package: `npm install @ai-sdk/react`
- Install `react-markdown` package: `npm install react-markdown`
- Run `npm install` to install dependencies
- Verify packages are added to `package.json` dependencies

**Success Criteria**:

- ✅ `ai` package installed (version ^5.0.0 or later)
- ✅ `@ai-sdk/react` package installed (version ^2.0.0 or later)
- ✅ `react-markdown` package installed (version ^10.0.0 or later)
- ✅ No TypeScript errors after installation
- ✅ `npm install` completes successfully

**Testing Requirements**:

- Verify packages in `package.json`
- Check `node_modules` contains new packages
- Run `npm run type-check` to ensure no type errors

**Estimated Effort**: 10 minutes

**Dependencies**: None

**Commit Strategy**: Can be committed independently

```bash
feat: install AI SDK and react-markdown dependencies for chatbot
```

---

### **STEP-002**: Create system prompt builder structure

**Description**: Create the system prompt builder file with basic structure and imports.

**Files to Create**:

- `app/lib/system-prompt.ts`

**Implementation Details**:

- Create `app/lib/system-prompt.ts` file
- Import content files: `homeContent` from `@/content/home`, `aboutContent` from `@/content/about`, `projects` from `@/content/projects`, `interestsData` from `@/content/interests`, `lifeImages` from `@/content/life`, `socialLinks` from `@/content/social`
- Import experience utility: `getAllExperienceEntries` from `@/app/lib/experience`
- Create `buildSystemPrompt()` function that returns a string
- Add basic structure with introduction section
- Export the function

**Success Criteria**:

- ✅ File exists at `app/lib/system-prompt.ts`
- ✅ All content imports are correct
- ✅ Function is exported and returns a string
- ✅ No TypeScript errors
- ✅ Basic structure is in place

**Testing Requirements**:

- Verify file exists
- Check TypeScript compilation: `npm run type-check`
- Function should be importable: `import { buildSystemPrompt } from '@/app/lib/system-prompt';`

**Estimated Effort**: 15 minutes

**Dependencies**: STEP-001

**Commit Strategy**: Can be committed independently

```bash
feat: create system prompt builder structure with content imports
```

---

### **STEP-003**: Read and format home content

**Description**: Add home page content (profile, skills, social buttons) to system prompt.

**Files to Modify**:

- `app/lib/system-prompt.ts`

**Implementation Details**:

- In `buildSystemPrompt()`, add section for "About Chen"
- Include: name, title, location (if available), bio/paragraph content
- Add "Skills & Expertise" section with all skill items
- Add "Current Status" section with "Now" content
- Format content as readable text with clear sections
- Use array-based approach (`sections.push()`) for cleaner code

**Success Criteria**:

- ✅ Home profile information included in system prompt
- ✅ Skills section formatted correctly
- ✅ Current status included
- ✅ Text is readable and well-formatted
- ✅ All home content is represented

**Testing Requirements**:

- Call `buildSystemPrompt()` and verify home content is present
- Check formatting is readable
- Verify no data is missing

**Estimated Effort**: 20 minutes

**Dependencies**: STEP-002

**Commit Strategy**: Can be committed independently

```bash
feat: add home content to system prompt builder
```

---

### **STEP-004**: Read and format about content

**Description**: Add about page content to system prompt.

**Files to Modify**:

- `app/lib/system-prompt.ts`

**Implementation Details**:

- Add "About" section to system prompt
- Include about page profile information
- Note that experience and skills are covered in separate sections
- Format content consistently with home section

**Success Criteria**:

- ✅ About content included in system prompt
- ✅ Content formatted consistently
- ✅ No duplicate information (experience/skills handled separately)

**Testing Requirements**:

- Verify about content appears in system prompt
- Check formatting consistency

**Estimated Effort**: 10 minutes

**Dependencies**: STEP-003

**Commit Strategy**: Can be committed independently

```bash
feat: add about content to system prompt builder
```

---

### **STEP-005**: Read and format projects content

**Description**: Add projects content to system prompt.

**Files to Modify**:

- `app/lib/system-prompt.ts`

**Implementation Details**:

- Add "Projects" section to system prompt
- For each project, include:
  - Title
  - Short description
  - Technologies used
  - Languages used
  - GitHub URL (if available)
  - Live URL (if available)
- Format as readable list with clear project boundaries

**Success Criteria**:

- ✅ All projects included in system prompt
- ✅ Project details formatted clearly
- ✅ URLs included for reference
- ✅ Technologies and languages listed

**Testing Requirements**:

- Verify all projects appear in system prompt
- Check project details are complete
- Verify formatting is readable

**Estimated Effort**: 20 minutes

**Dependencies**: STEP-004

**Commit Strategy**: Can be committed independently

```bash
feat: add projects content to system prompt builder
```

---

### **STEP-006**: Read and format experience content

**Description**: Add experience entries from markdown files to system prompt.

**Files to Modify**:

- `app/lib/system-prompt.ts`

**Implementation Details**:

- Add "Professional Experience" section
- Use `getAllExperienceEntries()` to get all experience entries
- For each entry, include:
  - Role and company
  - Date range (startDate - endDate)
  - Content (responsibilities from markdown)
- Format entries chronologically (most recent first, as returned by function)
- Format content bullets clearly

**Success Criteria**:

- ✅ All experience entries included
- ✅ Entries formatted with role, company, dates
- ✅ Responsibilities included from markdown content
- ✅ Chronological order maintained

**Testing Requirements**:

- Verify all experience entries appear
- Check date formatting is correct
- Verify markdown content is included

**Estimated Effort**: 20 minutes

**Dependencies**: STEP-005

**Commit Strategy**: Can be committed independently

```bash
feat: add experience content to system prompt builder
```

---

### **STEP-007**: Read and format interests and life content

**Description**: Add interests and life content, plus social links and instructions to system prompt.

**Files to Modify**:

- `app/lib/system-prompt.ts`

**Implementation Details**:

- Add "Personal Interests" section with interests data
- Add "Life" section (if relevant content from life.ts)
- Add "Links" section with social links
- Add instructions section at the beginning:
  - "You are a helpful assistant that answers questions about Chen Tetroashvili."
  - "Answer questions about Chen's background, experience, skills, projects, and interests."
  - "When possible, cite specific sources (e.g., mention specific projects, companies, or experiences)."
  - "Be helpful, concise, and accurate."
  - "Format your responses using Markdown for better readability."
- Ensure all sections are properly formatted and joined

**Success Criteria**:

- ✅ Interests included in system prompt
- ✅ Social links included
- ✅ Instructions section added at beginning
- ✅ All content sections properly formatted
- ✅ Final prompt is complete and readable

**Testing Requirements**:

- Call `buildSystemPrompt()` and verify complete output
- Check all sections are present
- Verify formatting is consistent
- Test prompt length is reasonable

**Estimated Effort**: 20 minutes

**Dependencies**: STEP-006

**Commit Strategy**: Can be committed independently

```bash
feat: complete system prompt with interests, life, and instructions
```

---

### **STEP-008**: Create Chat API route

**Description**: Create the API route that handles chat requests with streaming support.

**Files to Create**:

- `app/api/chat/route.ts`

**Implementation Details**:

- Create API route file at `app/api/chat/route.ts`
- Import `streamText` and `convertToCoreMessages` from `ai`
- Import `buildSystemPrompt` from `@/app/lib/system-prompt`
- Set `export const runtime = "nodejs"` for proper .env.local reading
- Define `MAX_MESSAGES_PER_REQUEST = 10` constant
- Create `POST` function that:
  1. Receives `messages` from request body
  2. Validates messages array exists and is an array
  3. Validates message count doesn't exceed limit
  4. Loads system prompt using `buildSystemPrompt()`
  5. Converts messages using `convertToCoreMessages()`
  6. Streams response using `streamText()` with:
     - Model: `"anthropic/claude-3.5-sonnet"`
     - System: system prompt
     - Messages: converted core messages
  7. Returns `result.toUIMessageStreamResponse()` for DefaultChatTransport compatibility
- Add error handling with helpful auth error messages
- Handle authentication errors specifically (401, Unauthorized, API key errors)

**Success Criteria**:

- ✅ API route exists at `app/api/chat/route.ts`
- ✅ POST function handles requests correctly
- ✅ Input validation prevents abuse
- ✅ System prompt is loaded and used
- ✅ Streaming works correctly
- ✅ Error handling is comprehensive
- ✅ Helpful error messages for auth issues

**Testing Requirements**:

- Test API endpoint responds to POST requests
- Verify streaming works
- Test input validation (too many messages, invalid format)
- Test error handling
- Verify system prompt is included in requests

**Estimated Effort**: 45 minutes

**Dependencies**: STEP-007

**Commit Strategy**: Can be committed independently

```bash
feat: create chat API route with streaming support
```

---

### **STEP-009**: Create Chat component

**Description**: Create the main Chat component with message display, input, and streaming support.

**Files to Create**:

- `app/components/Chat.tsx`

**Implementation Details**:

- Create `app/components/Chat.tsx` as client component (`"use client"`)
- Import `useChat` from `@ai-sdk/react`
- Import `DefaultChatTransport` from `ai`
- Import `MarkdownRenderer` component (to be created in STEP-010)
- Define constants:
  - `MAX_INPUT_LENGTH = 100`
  - `CHAR_COUNTER_THRESHOLD = 70`
  - `CHAR_WARNING_THRESHOLD = 80`
  - `CHAR_DANGER_THRESHOLD = 90`
- Create `chatTransport` instance outside component
- Create `Chat` component with:
  - `inputRef` prop (optional callback ref)
  - State for input value
  - `useChat` hook with transport
  - Message list display (user/assistant messages)
  - Empty state message
  - Loading indicator (animated dots)
  - Error display
  - Input field with character limit and counter
  - Send button with disabled states
  - Auto-scroll to latest message
- Style with monochrome design system
- Support dark mode
- Ensure accessibility (ARIA labels, keyboard navigation)

**Success Criteria**:

- ✅ Chat component renders correctly
- ✅ Messages display properly (user/assistant)
- ✅ Streaming works smoothly
- ✅ Input validation works (character limit)
- ✅ Character counter shows at appropriate thresholds
- ✅ Loading states work correctly
- ✅ Error handling displays user-friendly messages
- ✅ Auto-scroll works
- ✅ Accessible (ARIA labels, keyboard navigation)
- ✅ Dark mode support
- ✅ Monochrome design system compliance

**Testing Requirements**:

- Test component renders
- Test message sending
- Test streaming display
- Test input validation
- Test error states
- Test accessibility (keyboard navigation, ARIA labels)
- Test dark mode

**Estimated Effort**: 1.5 hours

**Dependencies**: STEP-008, STEP-010 (MarkdownRenderer)

**Commit Strategy**: Can be committed independently (after STEP-010)

```bash
feat: create Chat component with streaming and input validation
```

---

### **STEP-010**: Create MarkdownRenderer component

**Description**: Create component to render markdown content from assistant messages.

**Files to Create**:

- `app/components/MarkdownRenderer.tsx`

**Implementation Details**:

- Create `app/components/MarkdownRenderer.tsx` as client component
- Import `ReactMarkdown` from `react-markdown`
- Create component with `content` and optional `className` props
- Define markdown styles following monochrome design system:
  - Text colors (gray-900/gray-100 for dark mode)
  - Link colors (emerald-600/emerald-400 for dark mode)
  - Code block styles (gray-100/gray-800 backgrounds)
  - Heading styles
  - List styles
  - Blockquote styles
- Configure ReactMarkdown components:
  - Headings (h1, h2, h3)
  - Paragraphs
  - Lists (ul, ol, li)
  - Code (inline and block)
  - Links (with target="\_blank" rel="noopener noreferrer")
  - Strong, emphasis
  - Blockquotes
  - Horizontal rules
- Support dark mode
- Ensure proper styling for all markdown elements

**Success Criteria**:

- ✅ MarkdownRenderer component exists
- ✅ Renders markdown content correctly
- ✅ All markdown elements styled properly
- ✅ Dark mode support
- ✅ Links open in new tab
- ✅ Code blocks formatted correctly
- ✅ Monochrome design system compliance

**Testing Requirements**:

- Test with various markdown content
- Verify all elements render correctly
- Test dark mode
- Verify link behavior

**Estimated Effort**: 45 minutes

**Dependencies**: STEP-001 (react-markdown installed)

**Commit Strategy**: Can be committed independently

```bash
feat: create MarkdownRenderer component for assistant messages
```

---

### **STEP-011**: Create ChatWidget component

**Description**: Create floating chat widget with button and modal dialog.

**Files to Create**:

- `app/components/ChatWidget.tsx`

**Implementation Details**:

- Create `app/components/ChatWidget.tsx` as client component
- Import `Chat` component
- Create component with:
  - State for `isOpen` (boolean)
  - Floating button in bottom-right corner
  - Modal dialog that appears when open
  - Close button in dialog header
  - Escape key handler to close dialog
  - Focus management (auto-focus input when opened)
  - Proper ARIA attributes (role="dialog", aria-modal, aria-label)
- Style with monochrome design system
- Support dark mode
- Responsive design (mobile-friendly sizing)
- Ensure accessibility:
  - ARIA labels on all interactive elements
  - Keyboard navigation (Escape to close)
  - Focus management
  - Proper dialog semantics

**Success Criteria**:

- ✅ ChatWidget component exists
- ✅ Floating button renders in bottom-right
- ✅ Modal dialog opens/closes correctly
- ✅ Escape key closes dialog
- ✅ Focus management works
- ✅ Accessible (ARIA labels, keyboard navigation)
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Monochrome design system compliance

**Testing Requirements**:

- Test widget toggle (open/close)
- Test Escape key handling
- Test focus management
- Test accessibility (keyboard navigation, ARIA)
- Test responsive design
- Test dark mode

**Estimated Effort**: 1 hour

**Dependencies**: STEP-009 (Chat component)

**Commit Strategy**: Can be committed independently

```bash
feat: create ChatWidget floating component with modal dialog
```

---

### **STEP-012**: Integrate ChatWidget into layout and add tests

**Description**: Add ChatWidget to layout for site-wide access and create comprehensive tests.

**Files to Modify**:

- `app/layout.tsx`

**Files to Create**:

- `tests/Chat.test.tsx`
- `tests/ChatWidget.test.tsx`
- `tests/MarkdownRenderer.test.tsx`

**Implementation Details**:

- Import `ChatWidget` in `app/layout.tsx`
- Add `<ChatWidget />` to layout (after Footer, before closing body tag)
- Create test file `tests/Chat.test.tsx`:
  - Test empty state
  - Test input and send button
  - Test form submission
  - Test message display
  - Test error handling
  - Test loading states
  - Test markdown rendering
  - Test character counter
  - Test accessibility
- Create test file `tests/ChatWidget.test.tsx`:
  - Test widget toggle (open/close)
  - Test close button
  - Test Escape key handling
  - Test accessibility
- Create test file `tests/MarkdownRenderer.test.tsx`:
  - Test markdown rendering (headings, lists, links, code)
  - Test dark mode styles
- Follow component testing standards:
  - Use semantic queries
  - Test accessibility requirements
  - Test user-observable behavior
  - No `data-testid` except where necessary

**Success Criteria**:

- ✅ ChatWidget integrated into layout
- ✅ Available site-wide on all pages
- ✅ All tests pass
- ✅ Test coverage for all components
- ✅ Tests follow component testing standards
- ✅ Accessibility tests included

**Testing Requirements**:

- Verify ChatWidget appears on all pages
- Run all tests: `npm run test`
- Verify test coverage
- Test accessibility manually
- Test full chat flow end-to-end

**Estimated Effort**: 2 hours

**Dependencies**: STEP-011

**Commit Strategy**: Can be committed independently

```bash
feat: integrate ChatWidget into layout and add comprehensive tests
```

---

## 🧪 Testing Checkpoints

### Unit Tests

**Chat Component** (`tests/Chat.test.tsx`):

- ✅ Empty state renders correctly
- ✅ Input field accepts text
- ✅ Send button works
- ✅ Form submission sends message
- ✅ Messages display correctly (user/assistant)
- ✅ Streaming text displays
- ✅ Loading indicator shows
- ✅ Error messages display
- ✅ Character counter works
- ✅ Character limit enforced
- ✅ Accessibility (ARIA labels, keyboard navigation)

**ChatWidget Component** (`tests/ChatWidget.test.tsx`):

- ✅ Widget button renders
- ✅ Clicking button opens dialog
- ✅ Close button closes dialog
- ✅ Escape key closes dialog
- ✅ Focus management works
- ✅ Accessibility (ARIA labels, roles)

**MarkdownRenderer Component** (`tests/MarkdownRenderer.test.tsx`):

- ✅ Renders markdown content
- ✅ Headings render correctly
- ✅ Lists render correctly
- ✅ Links render correctly
- ✅ Code blocks render correctly
- ✅ Dark mode styles apply

### Integration Tests

**Full Chat Flow**:

- ✅ User can ask question
- ✅ Assistant responds with relevant answer
- ✅ Streaming works smoothly
- ✅ Multiple messages work
- ✅ Error handling works

### Manual Testing

**User Workflows**:

- ✅ Ask questions about Chen's background
- ✅ Ask about experience
- ✅ Ask about skills
- ✅ Ask about projects
- ✅ Ask about interests
- ✅ Test on mobile (375px+)
- ✅ Test on desktop
- ✅ Test in dark mode
- ✅ Test keyboard navigation
- ✅ Test with screen reader

### Performance Impact

- ✅ Component renders quickly (< 100ms)
- ✅ Streaming doesn't block UI
- ✅ No layout shifts
- ✅ Efficient re-renders

### Accessibility Check

- ✅ WCAG AA contrast ratios
- ✅ All interactive elements have ARIA labels
- ✅ Keyboard navigation works
- ✅ Focus indicators visible
- ✅ Touch targets meet 44x44px minimum
- ✅ Screen reader compatible

## 📊 Progress Summary

**Overall Progress**: 8% (1/12 steps completed)

**Phase Breakdown**:

- **Phase 1**: Project Setup & Dependencies - 100% (1/1 steps) ✅
- **Phase 2**: System Prompt Builder - 0% (0/6 steps)
- **Phase 3**: Chat API Route - 0% (0/1 steps)
- **Phase 4**: Chat UI & Widget - 0% (0/4 steps)

**Next Steps**: Start with STEP-002 (Create system prompt builder structure)

## 🔗 Related Files

**Components** (to be created):

- `app/components/Chat.tsx`
- `app/components/ChatWidget.tsx`
- `app/components/MarkdownRenderer.tsx`

**API Routes** (to be created):

- `app/api/chat/route.ts`

**Lib Functions** (to be created):

- `app/lib/system-prompt.ts`

**Tests** (to be created):

- `tests/Chat.test.tsx`
- `tests/ChatWidget.test.tsx`
- `tests/MarkdownRenderer.test.tsx`

**Layout** (to be modified):

- `app/layout.tsx`

**Content Files** (existing, will be read):

- `content/home.ts`
- `content/about.ts`
- `content/projects.ts`
- `content/interests.ts`
- `content/life.ts`
- `content/social.ts`
- `content/experience/*.md` (via `app/lib/experience.ts`)

**Package Files** (modified):

- `package.json` ✅ (modified - dependencies installed)

## 📝 Notes

### Development Environment Setup

**For Local Development**:

- Use `vc dev` (Vercel CLI) for automatic OIDC token injection, OR
- Run `vc env pull` before `npm run dev` to get VERCEL_OIDC_TOKEN, OR
- Add `dev:vercel` script to package.json: `"dev:vercel": "vc dev"`

**Authentication**:

- Vercel AI Gateway uses OIDC token automatically in production
- No API keys needed for Anthropic Claude
- Authentication handled automatically when deployed to Vercel

### Future Enhancements (Out of Scope)

- Rate limiting with Upstash Redis
- Usage monitoring and cost alerts
- RAG enhancement for source citations
- Conversation history (privacy-first storage)
- Analytics on queries

### Design System Compliance

- All components must follow monochrome design system
- Foreground elements (text, icons, borders): white, gray, black only
- Background elements: may use light pastels (shades 50-100)
- Dark mode support required
- Accessibility (WCAG AA) required

---

_Last Updated: Phase 1 complete - STEP-001 dependencies installed (February 2026)_
