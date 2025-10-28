// Cypress Test Runner Configuration
// This file provides utilities for running different types of tests

// Test execution modes
const TEST_MODES = {
  QUICK: 'quick',
  COMPREHENSIVE: 'comprehensive', 
  RANDOM_PATH: 'random_path',
  EDGE_COVERAGE: 'edge_coverage'
}

// Test configuration
const TEST_CONFIG = {
  maxIterations: 50,
  edgeCoverageThreshold: 20,
  randomRuns: 3,
  delays: {
    betweenActions: 500,
    betweenRuns: 1000,
    pageLoad: 2000
  }
}

// Utility functions for test execution
class TestRunner {
  constructor() {
    this.visitedEdges = new Set()
    this.currentIteration = 0
    this.testResults = []
  }

  reset() {
    this.visitedEdges.clear()
    this.currentIteration = 0
    this.testResults = []
  }

  logTestResult(testName, result) {
    this.testResults.push({
      testName,
      result,
      timestamp: new Date().toISOString(),
      edgesVisited: this.visitedEdges.size
    })
  }

  getCoverageReport() {
    return {
      totalEdgesVisited: this.visitedEdges.size,
      uniqueEdges: Array.from(this.visitedEdges),
      testResults: this.testResults,
      coveragePercentage: (this.visitedEdges.size / 45) * 100 // Assuming 45 total edges
    }
  }
}

// Export for use in tests
export { TEST_MODES, TEST_CONFIG, TestRunner }
