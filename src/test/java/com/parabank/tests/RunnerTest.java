package com.parabank.tests;

import org.graphwalker.java.test.TestBuilder;

import org.junit.jupiter.api.Test;

import java.net.URISyntaxException;
import java.nio.file.Paths;

public class RunnerTest {

    @Test
    public void runAllTest() throws URISyntaxException {
        new TestBuilder()
            .addContext(
                new FinalTest(),
                Paths.get(RunnerTest.class.getResource("/com/parabank/resources/ParabankModel.json")
                    .toURI()), "quick_random(edge_coverage(100))"
            )
            .execute();
    }
}
