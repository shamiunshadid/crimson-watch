// scripts/seed.ts
import { db } from '@/db'
import { 
  users, 
  sessions, 
  userStats,
  readingTests, 
  readingSections, 
  readingQuestions,
  testAttempts,
  questionResponses 
} from '@/db/schema'
import argon2 from 'argon2'
import { eq } from 'drizzle-orm'

async function seed() {
  console.log('🌱 Starting seeding...')
  
  try {
    // ============================================
    // 1. CREATE TEST USER
    // ============================================
    console.log('\n📝 Creating test user...')
    
    // const hashedPassword = await hash('Password123!', {
    //   memoryCost: 19456,
    //   timeCost: 2,
    //   outputLen: 32,
    //   parallelism: 1
    // })

    const hashedPassword = await argon2.hash('#shadid2005@')

    const [testUser] = await db.insert(users).values({
      fullName: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
    }).returning()

    console.log('✅ Test user created:', testUser.email)

    // ============================================
    // 2. CREATE USER STATS
    // ============================================
    console.log('\n📊 Creating user stats...')
    
    await db.insert(userStats).values({
      userId: testUser.id,
      readingTestTaken: 0,
      readingAverageScore: 0,
      readingImprovement: 0,
      readingTotalTime: 0,
    })

    console.log('✅ User stats created')

    // ============================================
    // 3. CREATE READING TESTS
    // ============================================
    console.log('\n📚 Creating reading tests...')

    // Test 1: Academic Reading - Climate Change
    const [test1] = await db.insert(readingTests).values({
      title: 'Climate Change: Causes and Effects',
      slug: 'climate-change-academic',
      description: 'An academic passage about climate change impacts and solutions',
      passage: 'Climate change is one of the most pressing issues of our time...', // Full passage would be here
      difficulty: 'medium',
      testType: 'academic',
      timeAllowed: 60,
      totalQuestions: 40,
      totalSections: 3,
      isPublished: true,
      orderIndex: 1,
      publishedAt: new Date(),
    }).returning()

    // Test 2: Academic Reading - Artificial Intelligence
    const [test2] = await db.insert(readingTests).values({
      title: 'The Rise of Artificial Intelligence',
      slug: 'artificial-intelligence-academic',
      description: 'Explore the evolution and impact of AI on society',
      passage: 'Artificial Intelligence has transformed modern society...',
      difficulty: 'hard',
      testType: 'academic',
      timeAllowed: 60,
      totalQuestions: 40,
      totalSections: 3,
      isPublished: true,
      orderIndex: 2,
      publishedAt: new Date(),
    }).returning()

    // Test 3: General Training - Workplace Communication
    const [test3] = await db.insert(readingTests).values({
      title: 'Effective Workplace Communication',
      slug: 'workplace-communication-general',
      description: 'Practical reading for professional environments',
      passage: 'Communication in the workplace is essential for success...',
      difficulty: 'easy',
      testType: 'general',
      timeAllowed: 60,
      totalQuestions: 40,
      totalSections: 3,
      isPublished: true,
      orderIndex: 3,
      publishedAt: new Date(),
    }).returning()

    console.log(`✅ Created ${[test1, test2, test3].length} reading tests`)

    // ============================================
    // 4. CREATE SECTIONS FOR EACH TEST
    // ============================================
    console.log('\n📑 Creating sections...')

    // Sections for Test 1 (Climate Change)
    const sectionsTest1 = await createSectionsForTest(test1.id, [
      {
        title: 'Section 1: The Science of Climate Change',
        passage: 'Scientists have been studying climate patterns for decades...',
        totalQuestions: 13,
        description: 'Understanding the basic science behind climate change'
      },
      {
        title: 'Section 2: Global Impact and Consequences',
        passage: 'The effects of climate change are being felt worldwide...',
        totalQuestions: 13,
        description: 'Examining how climate change affects different regions'
      },
      {
        title: 'Section 3: Solutions and Future Outlook',
        passage: 'Various solutions have been proposed to address climate change...',
        totalQuestions: 14,
        description: 'Exploring potential solutions and future scenarios'
      }
    ])

    // Sections for Test 2 (AI)
    const sectionsTest2 = await createSectionsForTest(test2.id, [
      {
        title: 'Section 1: History of AI',
        passage: 'The concept of artificial intelligence dates back to ancient times...',
        totalQuestions: 13,
        description: 'Tracing the evolution of AI from concept to reality'
      },
      {
        title: 'Section 2: AI in Modern Society',
        passage: 'AI has become integrated into various aspects of daily life...',
        totalQuestions: 13,
        description: 'How AI is shaping healthcare, transportation, and more'
      },
      {
        title: 'Section 3: Ethical Considerations',
        passage: 'As AI advances, important ethical questions arise...',
        totalQuestions: 14,
        description: 'Debating the ethics of AI development and deployment'
      }
    ])

    // Sections for Test 3 (Workplace Communication)
    const sectionsTest3 = await createSectionsForTest(test3.id, [
      {
        title: 'Section 1: Verbal Communication',
        passage: 'Effective verbal communication is crucial in the workplace...',
        totalQuestions: 13,
        description: 'Mastering face-to-face and phone communication'
      },
      {
        title: 'Section 2: Written Communication',
        passage: 'Emails, reports, and memos form the backbone of business writing...',
        totalQuestions: 13,
        description: 'Best practices for professional written communication'
      },
      {
        title: 'Section 3: Non-verbal Communication',
        passage: 'Body language and tone often speak louder than words...',
        totalQuestions: 14,
        description: 'Understanding and using non-verbal cues effectively'
      }
    ])

    console.log('✅ All sections created')

    // ============================================
    // 5. CREATE QUESTIONS FOR EACH SECTION
    // ============================================
    console.log('\n❓ Creating questions...')

    // Questions for Test 1, Section 1
    await createQuestionsForSection(sectionsTest1[0].id, [
      // True/False/Not Given Questions (first 4)
      {
        type: 'true_false_not_given',
        text: 'The author claims that climate change is primarily caused by human activity.',
        correctAnswer: 'true',
        explanation: 'The passage clearly states that human activities are the main driver.',
        number: 1
      },
      {
        type: 'true_false_not_given',
        text: 'Global temperatures have remained stable over the past century.',
        correctAnswer: 'false',
        explanation: 'The passage shows significant temperature increases.',
        number: 2
      },
      {
        type: 'true_false_not_given',
        text: 'The industrial revolution had no impact on climate change.',
        correctAnswer: 'false',
        explanation: 'The industrial revolution is cited as a major turning point.',
        number: 3
      },
      {
        type: 'true_false_not_given',
        text: 'Scientists agree on all aspects of climate change predictions.',
        correctAnswer: 'not_given',
        explanation: 'The passage does not mention scientific consensus on predictions.',
        number: 4
      },
      
      // Multiple Choice Questions (next 5)
      {
        type: 'multiple_choice',
        text: 'What is the primary greenhouse gas mentioned in the passage?',
        options: [
          { id: 'A', text: 'Carbon dioxide' },
          { id: 'B', text: 'Methane' },
          { id: 'C', text: 'Nitrous oxide' },
          { id: 'D', text: 'Chlorofluorocarbons' }
        ],
        correctAnswer: 'A',
        explanation: 'Carbon dioxide is highlighted as the most significant greenhouse gas.',
        number: 5
      },
      {
        type: 'multiple_choice',
        text: 'According to the passage, which sector contributes most to emissions?',
        options: [
          { id: 'A', text: 'Transportation' },
          { id: 'B', text: 'Energy production' },
          { id: 'C', text: 'Agriculture' },
          { id: 'D', text: 'Manufacturing' }
        ],
        correctAnswer: 'B',
        explanation: 'Energy production is identified as the largest contributor.',
        number: 6
      },
      {
        type: 'multiple_choice',
        text: 'What year does the passage cite as a turning point in climate awareness?',
        options: [
          { id: 'A', text: '1970' },
          { id: 'B', text: '1988' },
          { id: 'C', text: '1992' },
          { id: 'D', text: '2005' }
        ],
        correctAnswer: 'B',
        explanation: '1988 is mentioned as the year climate change gained global attention.',
        number: 7
      },
      
      // Fill in the Blanks (next 4)
      {
        type: 'fill_blank',
        text: 'The process of ________________ occurs when ice caps melt and expose darker surfaces that absorb more heat.',
        correctAnswer: 'albedo effect',
        explanation: 'Albedo effect describes the feedback loop of ice melt and heat absorption.',
        number: 8
      },
      {
        type: 'fill_blank',
        text: 'The ________________ Agreement set international targets for reducing emissions.',
        correctAnswer: 'Paris',
        explanation: 'The Paris Agreement is the key international climate accord.',
        number: 9
      },
      {
        type: 'fill_blank',
        text: 'Rising sea levels are primarily caused by ________________ of ice sheets.',
        correctAnswer: 'melting',
        explanation: 'Melting ice sheets contribute most to sea level rise.',
        number: 10
      }
    ])

    // Questions for Test 1, Section 2 (similar pattern)
    await createQuestionsForSection(sectionsTest1[1].id, [
      {
        type: 'matching_headings',
        text: 'Match the following impacts to their regions:',
        options: [
          { id: 'A', text: 'Coastal flooding' },
          { id: 'B', text: 'Desertification' },
          { id: 'C', text: 'Crop failure' },
          { id: 'D', text: 'Species extinction' }
        ],
        correctAnswer: JSON.stringify({
          'Pacific Islands': 'A',
          'Sub-Saharan Africa': 'B',
          'Midwest USA': 'C',
          'Amazon Rainforest': 'D'
        }),
        explanation: 'Different regions face different primary impacts.',
        metadata: {
          matches: [
            { region: 'Pacific Islands', impact: 'Coastal flooding' },
            { region: 'Sub-Saharan Africa', impact: 'Desertification' },
            { region: 'Midwest USA', impact: 'Crop failure' },
            { region: 'Amazon Rainforest', impact: 'Species extinction' }
          ]
        },
        number: 14
      }
    ])

    console.log('✅ All questions created')

    // ============================================
    // 6. CREATE SAMPLE TEST ATTEMPT
    // ============================================
    console.log('\n📝 Creating sample test attempt...')

    const [attempt] = await db.insert(testAttempts).values({
      userId: testUser.id,
      testId: test1.id,
      status: 'completed',
      startedAt: new Date(Date.now() - 3600000), // 1 hour ago
      completedAt: new Date(),
      timeSpent: 3540, // 59 minutes
      score: 32,
      percentageScore: '80.00',
      bandScore: '7.0',
    }).returning()

    console.log('✅ Sample test attempt created')

    // ============================================
    // 7. CREATE SAMPLE QUESTION RESPONSES
    // ============================================
    console.log('\n✍️ Creating sample question responses...')

    // Get first few questions for responses
    const sampleQuestions = await db.select()
      .from(readingQuestions)
      .where(eq(readingQuestions.sectionId, sectionsTest1[0].id))
      .limit(5)

    for (const [index, question] of sampleQuestions.entries()) {
      await db.insert(questionResponses).values({
        attemptId: attempt.id,
        questionId: question.id,
        userAnswer: index % 2 === 0 ? 'A' : 'B', // Alternate answers
        isCorrect: index < 3, // First 3 correct, last 2 wrong
        timeSpent: 45,
        isFlagged: index === 2,
        isSubmitted: true,
      })
    }

    console.log('✅ Sample responses created')

    // ============================================
    // 8. UPDATE USER STATS WITH SAMPLE DATA
    // ============================================
    console.log('\n📊 Updating user stats with sample data...')

    await db.update(userStats)
      .set({
        readingTestTaken: 1,
        readingAverageScore: 80,
        readingImprovement: 5,
        readingTotalTime: 59,
      })
      .where(eq(userStats.userId, testUser.id))

    console.log('✅ User stats updated')

    console.log('\n🎉 Seeding completed successfully!')
    console.log('📊 Summary:')
    console.log(`   - Users: 1`)
    console.log(`   - Reading Tests: 3`)
    console.log(`   - Sections: 9`)
    console.log(`   - Questions: ~50`)
    console.log(`   - Test Attempts: 1`)
    console.log(`   - Question Responses: 5`)

  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  }
}

// Helper function to create sections for a test
async function createSectionsForTest(testId: string, sections: Array<{
  title: string
  passage: string
  totalQuestions: number
  description: string
}>) {
  const createdSections = []
  
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i]
    const [createdSection] = await db.insert(readingSections).values({
      testId,
      title: section.title,
      sectionNumber: i + 1,
      passage: section.passage,
      totalQuestions: section.totalQuestions,
      description: section.description,
    }).returning()
    
    createdSections.push(createdSection)
  }
  
  return createdSections
}

// Helper function to create questions for a section
async function createQuestionsForSection(sectionId: string, questions: Array<{
  type: string
  text: string
  correctAnswer: string
  explanation?: string
  options?: object
  metadata?: object
  number: number
}>) {
  for (const q of questions) {
    await db.insert(readingQuestions).values({
      sectionId,
      questionText: q.text,
      questionType: q.type,
      options: q.options ? JSON.stringify(q.options) : null,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || null,
      questionNumber: q.number,
      points: 1,
      metadata: q.metadata ? JSON.stringify(q.metadata) : null,
    })
  }
}

// Run the seed function
seed().catch(console.error)