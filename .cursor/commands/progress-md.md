# Progress MD Command

This command creates and maintains a detailed progress tracking document for any development plan or project, breaking complex work into small, testable steps that can be committed incrementally.

## Usage

Use this command when you want to:

- **Document Any Development Plan** - Convert discussion plans into structured progress tracking
- **Break Down Complex Features** - Split large implementations into manageable steps
- **Track Project Progress** - Monitor what's completed, in-progress, and pending
- **Enable Incremental Delivery** - Create commit-ready chunks of work
- **Facilitate Team Collaboration** - Clear visibility into progress and next steps
- **Manage Technical Debt** - Structure refactoring and improvement work

## What This Command Does

1. **Analyzes Current Discussion** - Reviews the conversation for development plans and decisions
2. **Creates Progress Document** - Generates a `progress-{feature-name}.md` file with structured tracking
3. **Breaks Down Tasks** - Splits complex features into small, testable steps
4. **Defines Success Criteria** - Clear completion criteria for each step
5. **Organizes by Priority** - Orders tasks by dependencies and importance
6. **Tracks Status** - Maintains status of each step (pending, in-progress, completed, blocked)
7. **Enables Incremental Delivery** - Each step can be committed and tested independently

## Progress Document Structure

The generated `progress-{feature-name}.md` will include:

### **📋 Project Overview**

- **Objective** - High-level goal and purpose of the project
- **Context** - Background and reasoning for the work
- **Success Metrics** - How completion will be measured
- **Timeline** - Estimated phases and milestones
- **Scope** - What's included and excluded from the project

### **🎯 Implementation Plan**

- **Phase Breakdown** - Major phases of development
- **Dependencies** - Task ordering and prerequisites
- **Risk Assessment** - Potential challenges and mitigation strategies
- **Testing Strategy** - How each phase will be validated
- **Resource Requirements** - Time, tools, and expertise needed

### **✅ Progress Tracking**

- **Completed Steps** - ✅ What's been finished with commit references
- **In Progress** - 🔄 Currently being worked on
- **Pending Steps** - ⏳ What's coming next
- **Blocked Items** - 🚫 Issues preventing progress

### **📝 Detailed Steps**

Each step includes:

- **Step ID** - Unique identifier for tracking
- **Description** - What needs to be done
- **Success Criteria** - How to know it's complete
- **Testing Requirements** - How to validate the change
- **Estimated Effort** - Time/complexity estimate
- **Dependencies** - What must be completed first
- **Commit Strategy** - Whether it can be committed independently

### **🧪 Testing Checkpoints**

For each major step:

- **Unit Tests** - Component/function level testing
- **Integration Tests** - Feature interaction testing
- **Manual Testing** - User workflow validation
- **Performance Impact** - Load/performance considerations
- **Accessibility Check** - WCAG compliance validation

## Example Progress Structure

```markdown
# 🎯 Feature Implementation - Progress Tracker

## 📋 Project Overview

**Objective**: [Description of what you're building/refactoring/fixing]
**Context**: [Why this work is needed and background information]
**Status**: 🔄 In Progress | **Phase**: 1 of 3 | **Progress**: 25%

## ✅ Completed Steps

- [x] **STEP-001**: Analysis and planning ✅
  - Commit: `feat: analyze implementation requirements`
  - Validated: Architecture review completed

## 🔄 In Progress

- [ ] **STEP-002**: Create core component structure 🔄
  - Status: Building main components
  - ETA: Current sprint

## ⏳ Pending Steps

- [ ] **STEP-003**: Add integration points
- [ ] **STEP-004**: Update existing code
- [ ] **STEP-005**: Add comprehensive tests
```

## Benefits

### **🎯 Clear Direction**

- Every team member knows exactly what to work on next
- No ambiguity about requirements or success criteria
- Clear dependencies prevent blocking issues

### **🚀 Incremental Progress**

- Small steps enable frequent commits and deployments
- Each step can be tested and validated independently
- Rollback is easier if issues are discovered

### **📊 Visibility**

- Stakeholders can see real progress at any time
- Blockers are identified and tracked explicitly
- Success is measured objectively

### **🔄 Continuous Integration**

- Each step is designed to be commit-ready
- CI/CD pipeline can validate each increment
- Quality gates ensure standards are maintained

## Integration with Other Commands

- **`/reflect-changes`** - Use after completing steps to validate patterns
- **`/add-tests`** - Automatically add tests for completed steps
- **`/precommit`** - Validate each step before committing

## Best Practices

### **Step Sizing**

- Each step should take 1-4 hours to complete
- Steps should be testable independently
- Avoid steps that touch too many files at once

### **Documentation**

- Update progress-{feature-name}.md immediately when status changes
- Include commit hashes for completed steps
- Document any deviations from the original plan

### **Testing Strategy**

- Every step should have clear testing requirements
- Manual testing steps should be documented
- Automated tests should be added where possible

## Example Usage Scenarios

### **After Feature Planning**

```
🎯 Use Case: Just finished planning any complex development work
✅ Action: Generate progress-{feature-name}.md with detailed breakdown
📋 Output: Structured plan with testable steps
```

### **During Development**

```
🎯 Use Case: Need to track progress on ongoing project
✅ Action: Update progress-{feature-name}.md with current status
📋 Output: Clear visibility into what's done/pending
```

### **Before Code Review**

```
🎯 Use Case: Preparing for team review of multi-step work
✅ Action: Reference progress-{feature-name}.md for context
📋 Output: Reviewers understand the overall plan and progress
```

### **Refactoring Projects**

```
🎯 Use Case: Large refactoring or technical debt cleanup
✅ Action: Break down into safe, incremental steps
📋 Output: Risk-reduced approach with rollback points
```

### **Bug Investigation**

```
🎯 Use Case: Complex bug requiring multiple investigation steps
✅ Action: Document investigation plan and findings
📋 Output: Systematic approach with clear progress tracking
```

---

_This command transforms complex development discussions into actionable, trackable progress._

