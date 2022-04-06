type NumberOrString = number | string

class Student <T> {
	public submitDate: T
	public studentName: T
	public userCode: T
	public examCode: T
	public examAns: T[]
	
	static of<T> (studentData: T[]) {
		return new Student(studentData)
	}
	constructor(studentData: T[]) {
		this.submitDate = studentData[0]
		this.studentName = studentData[1]
		this.userCode = studentData[2]
		this.examCode = studentData[3]
		this.examAns = studentData.slice(4, 19)
	}
}

function makeStudent<T> (data: T[]) {
	return Student.of(data)
}

function fixExamData (student: Student<NumberOrString>) {
	const examAns = [...student.examAns].map(v => v.toString())
	const remove = (words: string) => {
		const transformed = /\d+/g.exec(words)[0]
		if(words.length == transformed.length) return words
		else return ''
	}
	const fix = (answers: string | string[]) => {
		if (!Array.isArray(answers)) return remove(answers)
		else return answers.map(answer => fix(answer))
	}
	return fix(examAns)
}
