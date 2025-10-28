# ParabankGraphwalker
A project where I tested the features of the https://parabank.parasoft.com/parabank site using a model created with GraphWalker.


This module uses GraphWalker with Selenium WebDriver to execute model-based tests driven by a generator.

- Model file: `graphwalker-tests/src/test/resources/com/parabank/resources/ParabankModel.json`
- Test entry: `graphwalker-tests/src/test/java/com/parabank/tests/RunnerTest.java`
- Implementation: `graphwalker-tests/src/test/java/com/parabank/tests/FinalTest.java`
- Generator: `quick_random(edge_coverage(100))`

### Prerequisites
- Java 17+
- Maven 3.8+
- A local browser/driver (I'm using SafariDriver by default on macOS)
- On macOS: enable Safari's “Allow Remote Automation” in Develop menu

### Run Selenium GraphWalker tests
```bash
cd graphwalker-tests
mvn -q -Dtest=RunnerTest test
```
Or run the full test phase:
```bash
cd graphwalker-tests
mvn test
```
