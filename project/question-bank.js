window.QuizQuestionBank = (function () {
    function makeQuestion(id, source, topic, topicEn, difficulty, mastery, question, questionEn, options, optionsEn, answer, explanation, explanationEn, extra) {
        return Object.assign({
            id: id,
            source: source,
            topic: topic,
            topicEn: topicEn,
            difficulty: difficulty,
            mastery: mastery,
            question: question,
            questionEn: questionEn,
            options: options,
            optionsEn: optionsEn,
            answer: answer,
            explanation: explanation,
            explanationEn: explanationEn
        }, extra || {});
    }

    function shuffle(arr) {
        var copy = arr.slice();
        for (var i = copy.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = copy[i];
            copy[i] = copy[j];
            copy[j] = temp;
        }
        return copy;
    }

    function diversify(list, keys) {
        var remaining = shuffle(list);
        var picked = [];
        var counts = {};
        var last = {};
        (keys || []).forEach(function (k) {
            counts[k] = {};
            last[k] = '';
        });

        while (remaining.length) {
            var bestIdx = 0;
            var bestScore = Infinity;

            for (var i = 0; i < remaining.length; i++) {
                var q = remaining[i];
                var score = 0;

                (keys || []).forEach(function (k) {
                    var v = String(q[k] || '');
                    score += (counts[k][v] || 0);
                    if (last[k] === v) score += 3;
                });

                score += Math.random() * 0.35;

                if (score < bestScore) {
                    bestScore = score;
                    bestIdx = i;
                }
            }

            var chosen = remaining.splice(bestIdx, 1)[0];
            picked.push(chosen);

            (keys || []).forEach(function (k) {
                var v = String(chosen[k] || '');
                counts[k][v] = (counts[k][v] || 0) + 1;
                last[k] = v;
            });
        }

        return picked;
    }

    var topic = [];
    var comprehensive = [];
    var daily = [];

    function addTopic(id, topicZh, topicEn, difficulty, mastery, qType, qZh, qEn, optsZh, optsEn, answer, expZh, expEn) {
        topic.push(makeQuestion(
            id,
            'topic',
            topicZh,
            topicEn,
            difficulty,
            mastery,
            qZh,
            qEn,
            optsZh,
            optsEn,
            answer,
            expZh,
            expEn,
            { qType: qType }
        ));
    }

    function addComp(id, topicZh, topicEn, difficulty, mastery, qType, qZh, qEn, optsZh, optsEn, answer, expZh, expEn) {
        comprehensive.push(makeQuestion(
            id,
            'comprehensive',
            topicZh,
            topicEn,
            difficulty,
            mastery,
            qZh,
            qEn,
            optsZh,
            optsEn,
            answer,
            expZh,
            expEn,
            { qType: qType }
        ));
    }

    [3, 4, 6, 8].forEach(function (r, i) {
        addTopic(
            'topic-basic-rd-' + String(i + 1).padStart(3, '0'),
            '圆的基本性质',
            'Circle Basics',
            1 + (i % 2),
            3,
            'calc_radius_diameter',
            '半径为 ' + r + ' cm 的圆，直径是（ ）',
            'A circle with radius ' + r + ' cm has diameter ( ).',
            [r + ' cm', (2 * r) + ' cm', (r + 2) + ' cm', (r * 3) + ' cm'],
            [r + ' cm', (2 * r) + ' cm', (r + 2) + ' cm', (r * 3) + ' cm'],
            1,
            '直径等于半径的两倍。',
            'The diameter is twice the radius.'
        );
    });

    [10, 12, 14, 18].forEach(function (d, i) {
        addTopic(
            'topic-basic-dr-' + String(i + 1).padStart(3, '0'),
            '圆的基本性质',
            'Circle Basics',
            1 + (i % 2),
            3,
            'calc_radius_diameter',
            '直径为 ' + d + ' cm 的圆，半径是（ ）',
            'A circle with diameter ' + d + ' cm has radius ( ).',
            [(d / 2) + ' cm', d + ' cm', (d / 4) + ' cm', (d * 2) + ' cm'],
            [(d / 2) + ' cm', d + ' cm', (d / 4) + ' cm', (d * 2) + ' cm'],
            0,
            '半径是直径的一半。',
            'The radius is half of the diameter.'
        );
    });

    [
        {
            qZh: '连接圆心与圆上任意一点的线段叫做（ ）',
            qEn: 'A segment from the center to a point on the circle is called ( ).',
            optsZh: ['弦', '半径', '直径', '切线'],
            optsEn: ['Chord', 'Radius', 'Diameter', 'Tangent'],
            ans: 1,
            expZh: '定义：圆心到圆上一点的线段是半径。',
            expEn: 'By definition, that segment is a radius.'
        },
        {
            qZh: '圆中最长的弦是（ ）',
            qEn: 'The longest chord in a circle is ( ).',
            optsZh: ['半径', '切线', '直径', '弧'],
            optsEn: ['Radius', 'Tangent', 'Diameter', 'Arc'],
            ans: 2,
            expZh: '最长弦是经过圆心的弦，即直径。',
            expEn: 'The longest chord passes through the center, i.e. the diameter.'
        },
        {
            qZh: '与圆只有一个公共点的直线叫做（ ）',
            qEn: 'A line with exactly one common point with a circle is ( ).',
            optsZh: ['切线', '割线', '弦', '半径'],
            optsEn: ['Tangent', 'Secant', 'Chord', 'Radius'],
            ans: 0,
            expZh: '与圆只有一个公共点的是切线。',
            expEn: 'A tangent has exactly one common point with the circle.'
        },
        {
            qZh: '连接圆上两点的线段是（ ）',
            qEn: 'A segment joining two points on a circle is ( ).',
            optsZh: ['半径', '直径', '弦', '切线'],
            optsEn: ['Radius', 'Diameter', 'Chord', 'Tangent'],
            ans: 2,
            expZh: '定义：连接圆上两点的线段叫弦。',
            expEn: 'By definition, it is a chord.'
        }
    ].forEach(function (item, i) {
        addTopic(
            'topic-basic-def-' + String(i + 1).padStart(3, '0'),
            '圆的基本性质',
            'Circle Basics',
            2,
            3,
            'concept_definition',
            item.qZh,
            item.qEn,
            item.optsZh,
            item.optsEn,
            item.ans,
            item.expZh,
            item.expEn
        );
    });

    [
        {
            qZh: '已知圆半径 r=6 cm，点 A 满足 OA=4 cm，则点 A（ ）',
            qEn: 'Given r=6 cm and OA=4 cm, point A is ( ).',
            optsZh: ['在圆内', '在圆上', '在圆外', '无法判断'],
            optsEn: ['Inside the circle', 'On the circle', 'Outside the circle', 'Cannot decide'],
            ans: 0,
            expZh: 'OA<r，点在圆内。',
            expEn: 'Since OA<r, the point is inside.'
        },
        {
            qZh: '已知圆半径 r=7 cm，点 B 满足 OB=7 cm，则点 B（ ）',
            qEn: 'Given r=7 cm and OB=7 cm, point B is ( ).',
            optsZh: ['在圆外', '在圆上', '在圆内', '无法判断'],
            optsEn: ['Outside', 'On the circle', 'Inside', 'Cannot decide'],
            ans: 1,
            expZh: 'OB=r，点在圆上。',
            expEn: 'OB=r, so the point lies on the circle.'
        },
        {
            qZh: '已知圆半径 r=5 cm，点 C 满足 OC=9 cm，则点 C（ ）',
            qEn: 'Given r=5 cm and OC=9 cm, point C is ( ).',
            optsZh: ['在圆内', '在圆上', '在圆外', '是圆心'],
            optsEn: ['Inside', 'On the circle', 'Outside', 'The center'],
            ans: 2,
            expZh: 'OC>r，点在圆外。',
            expEn: 'OC>r, so the point is outside.'
        },
        {
            qZh: '若点 P 在某圆内，则 OP 与半径 r 的关系是（ ）',
            qEn: 'If point P is inside a circle, then OP and radius r satisfy ( ).',
            optsZh: ['OP=r', 'OP>r', 'OP<r', 'OP=2r'],
            optsEn: ['OP=r', 'OP>r', 'OP<r', 'OP=2r'],
            ans: 2,
            expZh: '点在圆内等价于到圆心距离小于半径。',
            expEn: 'Inside means distance to center is less than radius.'
        }
    ].forEach(function (item, i) {
        addTopic(
            'topic-basic-pos-' + String(i + 1).padStart(3, '0'),
            '圆的基本性质',
            'Circle Basics',
            2,
            3,
            'point_position',
            item.qZh,
            item.qEn,
            item.optsZh,
            item.optsEn,
            item.ans,
            item.expZh,
            item.expEn
        );
    });

    [
        {
            qZh: '下列说法正确的是（ ）',
            qEn: 'Which statement is correct?',
            optsZh: ['所有弦都经过圆心', '半径等于直径的两倍', '直径是过圆心的弦', '切线连接圆上两点'],
            optsEn: ['All chords pass center', 'Radius is twice diameter', 'Diameter is a chord through center', 'A tangent joins two points on the circle'],
            ans: 2,
            expZh: '只有“直径是过圆心的弦”正确。',
            expEn: 'Only “Diameter is a chord through the center” is correct.'
        },
        {
            qZh: '若半径增加 1 倍（变为原来的 2 倍），则直径（ ）',
            qEn: 'If radius doubles, the diameter ( ).',
            optsZh: ['不变', '变为原来的 2 倍', '变为原来的 3 倍', '减少一半'],
            optsEn: ['Unchanged', 'Also doubles', 'Triples', 'Halves'],
            ans: 1,
            expZh: 'd=2r，r 翻倍则 d 也翻倍。',
            expEn: 'd=2r. Doubling r doubles d.'
        },
        {
            qZh: '已知直径 d=20 cm，则半径与直径之比 r:d 为（ ）',
            qEn: 'Given d=20 cm, ratio r:d equals ( ).',
            optsZh: ['1:2', '2:1', '1:1', '1:4'],
            optsEn: ['1:2', '2:1', '1:1', '1:4'],
            ans: 0,
            expZh: 'r=d/2，所以 r:d=1:2。',
            expEn: 'r=d/2, so r:d=1:2.'
        },
        {
            qZh: '一条线段若要成为某圆的直径，必须满足（ ）',
            qEn: 'To be a diameter of a circle, a segment must ( ).',
            optsZh: ['只要两端在圆上', '经过圆心且两端在圆上', '与半径垂直', '与切线平行'],
            optsEn: ['Only endpoints on circle', 'Pass center and endpoints on circle', 'Be perpendicular to a radius', 'Be parallel to a tangent'],
            ans: 1,
            expZh: '直径定义：过圆心的弦。',
            expEn: 'A diameter is a chord through the center.'
        }
    ].forEach(function (item, i) {
        addTopic(
            'topic-basic-judge-' + String(i + 1).padStart(3, '0'),
            '圆的基本性质',
            'Circle Basics',
            3,
            2,
            'property_judgement',
            item.qZh,
            item.qEn,
            item.optsZh,
            item.optsEn,
            item.ans,
            item.expZh,
            item.expEn
        );
    });

    [60, 90, 120, 150].forEach(function (a, i) {
        addTopic(
            'topic-angle-ci-' + String(i + 1).padStart(3, '0'),
            '圆心角与圆周角',
            'Central and Inscribed Angles',
            2 + (i % 2),
            3,
            'calc_central_to_inscribed',
            '若同弧所对圆心角为 ' + a + '°，则圆周角是（ ）',
            'If the central angle on the same arc is ' + a + '°, the inscribed angle is ( ).',
            [(a / 2) + '°', a + '°', (a / 3) + '°', (a * 2) + '°'],
            [(a / 2) + '°', a + '°', (a / 3) + '°', (a * 2) + '°'],
            0,
            '同弧所对圆周角等于圆心角的一半。',
            'The inscribed angle is half the central angle on the same arc.'
        );
    });

    [25, 35, 40, 55].forEach(function (a, i) {
        addTopic(
            'topic-angle-ic-' + String(i + 1).padStart(3, '0'),
            '圆心角与圆周角',
            'Central and Inscribed Angles',
            2 + (i % 2),
            3,
            'calc_inscribed_to_central',
            '若同弧所对圆周角为 ' + a + '°，则圆心角是（ ）',
            'If the inscribed angle on the same arc is ' + a + '°, the central angle is ( ).',
            [a + '°', (a * 2) + '°', (a + 30) + '°', (a * 3) + '°'],
            [a + '°', (a * 2) + '°', (a + 30) + '°', (a * 3) + '°'],
            1,
            '同弧所对圆心角是圆周角的两倍。',
            'The central angle is twice the inscribed angle on the same arc.'
        );
    });

    [
        {
            qZh: '同弧所对的两个圆周角（ ）',
            qEn: 'Two inscribed angles subtending the same arc are ( ).',
            optsZh: ['相等', '互补', '垂直', '无关'],
            optsEn: ['Equal', 'Supplementary', 'Perpendicular', 'Unrelated'],
            ans: 0,
            expZh: '同弧所对圆周角相等。',
            expEn: 'Inscribed angles subtending the same arc are equal.'
        },
        {
            qZh: '若两个圆周角相等，且都在同一圆内，则它们所对的弧通常（ ）',
            qEn: 'If two inscribed angles are equal in the same circle, their arcs are usually ( ).',
            optsZh: ['相等', '互余', '互补', '不确定'],
            optsEn: ['Equal', 'Complementary', 'Supplementary', 'Undetermined'],
            ans: 0,
            expZh: '同圆中等圆周角对应等弧。',
            expEn: 'Equal inscribed angles in the same circle subtend equal arcs.'
        },
        {
            qZh: '在同一圆内，圆心角越大，其对应圆周角通常（ ）',
            qEn: 'In the same circle, when the central angle is larger, its inscribed angle is usually ( ).',
            optsZh: ['越大', '越小', '不变', '等于 90°'],
            optsEn: ['Larger', 'Smaller', 'Unchanged', 'Always 90°'],
            ans: 0,
            expZh: '圆周角是圆心角的一半，随圆心角同向变化。',
            expEn: 'Inscribed angle is half of central angle and changes in the same direction.'
        },
        {
            qZh: '判断：圆周角与对应圆心角的关系正确的是（ ）',
            qEn: 'Choose the correct relation between inscribed and central angle.',
            optsZh: ['圆周角=圆心角', '圆周角=圆心角的一半', '圆周角=圆心角的两倍', '无固定关系'],
            optsEn: ['Equal', 'Half', 'Double', 'No fixed relation'],
            ans: 1,
            expZh: '同弧条件下，圆周角=圆心角的一半。',
            expEn: 'On the same arc, inscribed angle = half of central angle.'
        }
    ].forEach(function (item, i) {
        addTopic(
            'topic-angle-concept-' + String(i + 1).padStart(3, '0'),
            '圆心角与圆周角',
            'Central and Inscribed Angles',
            3,
            3,
            'angle_relation_concept',
            item.qZh,
            item.qEn,
            item.optsZh,
            item.optsEn,
            item.ans,
            item.expZh,
            item.expEn
        );
    });

    [
        {
            qZh: '直径所对的圆周角是（ ）',
            qEn: 'An inscribed angle subtending a diameter is ( ).',
            optsZh: ['锐角', '直角', '钝角', '平角'],
            optsEn: ['Acute', 'Right', 'Obtuse', 'Straight'],
            ans: 1,
            expZh: '直径所对圆周角恒为 90°。',
            expEn: 'The inscribed angle subtending a diameter is always 90°.'
        },
        {
            qZh: '若某圆周角为 90°，其所对弧对应的弦常是（ ）',
            qEn: 'If an inscribed angle is 90°, the subtended chord is usually ( ).',
            optsZh: ['半径', '切线', '直径', '弧长'],
            optsEn: ['Radius', 'Tangent', 'Diameter', 'Arc length'],
            ans: 2,
            expZh: '圆周角为 90° 时对应弦为直径。',
            expEn: 'A 90° inscribed angle subtends a diameter.'
        },
        {
            qZh: '下列可用于判定一条弦是直径的是（ ）',
            qEn: 'Which can prove a chord is a diameter?',
            optsZh: ['该弦最短', '该弦所对圆周角为 90°', '该弦与切线平行', '该弦与半径相等'],
            optsEn: ['It is shortest', 'Its inscribed angle is 90°', 'It is parallel to tangent', 'It equals a radius'],
            ans: 1,
            expZh: '90°圆周角定理可反向判定直径。',
            expEn: 'The converse of the 90° inscribed-angle theorem applies.'
        },
        {
            qZh: '若 AB 是直径，C 在圆上，则 ∠ACB（ ）',
            qEn: 'If AB is a diameter and C is on the circle, then ∠ACB is ( ).',
            optsZh: ['45°', '60°', '90°', '120°'],
            optsEn: ['45°', '60°', '90°', '120°'],
            ans: 2,
            expZh: '直径所对圆周角恒为直角。',
            expEn: 'An inscribed angle subtending a diameter is right.'
        }
    ].forEach(function (item, i) {
        addTopic(
            'topic-angle-diameter-' + String(i + 1).padStart(3, '0'),
            '圆心角与圆周角',
            'Central and Inscribed Angles',
            3 + (i % 2),
            2,
            'diameter_right_angle',
            item.qZh,
            item.qEn,
            item.optsZh,
            item.optsEn,
            item.ans,
            item.expZh,
            item.expEn
        );
    });

    [
        {
            qZh: '圆内接四边形的对角关系是（ ）',
            qEn: 'Opposite angles of a cyclic quadrilateral are ( ).',
            optsZh: ['相等', '互余', '互补', '垂直'],
            optsEn: ['Equal', 'Complementary', 'Supplementary', 'Perpendicular'],
            ans: 2,
            expZh: '圆内接四边形对角互补。',
            expEn: 'Opposite angles are supplementary.'
        },
        {
            qZh: '若圆内接四边形一个角为 68°，其对角为（ ）',
            qEn: 'In a cyclic quadrilateral, if one angle is 68°, opposite angle is ( ).',
            optsZh: ['22°', '68°', '112°', '136°'],
            optsEn: ['22°', '68°', '112°', '136°'],
            ans: 2,
            expZh: '对角和为 180°，所以是 112°。',
            expEn: 'Opposite angles sum to 180°, so 112°.'
        },
        {
            qZh: '圆内接四边形中，若一个角增大，则其对角（ ）',
            qEn: 'In a cyclic quadrilateral, if one angle increases, opposite angle ( ).',
            optsZh: ['增大', '减小', '不变', '等于它'],
            optsEn: ['Increases', 'Decreases', 'Unchanged', 'Equals it'],
            ans: 1,
            expZh: '两角和固定 180°，一个增大则另一个减小。',
            expEn: 'Their sum is fixed at 180°.'
        },
        {
            qZh: '下列与圆周角知识直接相关的是（ ）',
            qEn: 'Which is directly related to inscribed-angle knowledge?',
            optsZh: ['切线段相等', '对角互补（圆内接四边形）', '半径垂直切线', '弦越近心越长'],
            optsEn: ['Equal tangents', 'Opposite supplementary (cyclic quadrilateral)', 'Radius perpendicular tangent', 'Closer chord is longer'],
            ans: 1,
            expZh: '圆内接四边形对角互补属于圆周角推论。',
            expEn: 'It is a corollary of inscribed-angle theory.'
        }
    ].forEach(function (item, i) {
        addTopic(
            'topic-angle-cyclic-' + String(i + 1).padStart(3, '0'),
            '圆心角与圆周角',
            'Central and Inscribed Angles',
            4,
            2,
            'cyclic_quadrilateral',
            item.qZh,
            item.qEn,
            item.optsZh,
            item.optsEn,
            item.ans,
            item.expZh,
            item.expEn
        );
    });

    [
        '半径与切线在切点处（ ）',
        '若 l 是圆的切线，则它与切点处半径（ ）',
        '切线与过切点的半径位置关系是（ ）',
        '判断切线时常验证它与半径（ ）'
    ].forEach(function (qZh, i) {
        addTopic(
            'topic-tan-perp-' + String(i + 1).padStart(3, '0'),
            '切线性质',
            'Tangent Properties',
            2 + (i % 2),
            3,
            'tangent_perpendicular',
            qZh,
            'For tangency, the tangent and radius at the touching point are ( ).',
            ['平行', '重合', '垂直', '无法确定'],
            ['Parallel', 'Coincident', 'Perpendicular', 'Cannot determine'],
            2,
            '切线与过切点的半径垂直。',
            'A tangent is perpendicular to the radius at tangency.'
        );
    });

    [
        {
            qZh: '一条直线与圆有且只有 1 个公共点，这条直线是（ ）',
            qEn: 'A line with exactly one common point with a circle is ( ).',
            ans: 0
        },
        {
            qZh: '一条直线与圆有 2 个公共点，这条直线更可能是（ ）',
            qEn: 'A line with two common points with a circle is likely a ( ).',
            ans: 1
        },
        {
            qZh: '一条直线与圆没有公共点，这条直线与圆的位置关系是（ ）',
            qEn: 'A line with no common point with a circle is ( ).',
            ans: 2
        },
        {
            qZh: '关于切线，下列说法正确的是（ ）',
            qEn: 'Which is correct about a tangent?',
            ans: 0
        }
    ].forEach(function (item, i) {
        var optsZh = i === 1
            ? ['切线', '割线', '外离线', '半径']
            : i === 2
                ? ['切线', '割线', '外离线', '弦']
                : ['与圆只有一个公共点', '与圆有两个公共点', '一定过圆心', '连接两圆上点'];

        var optsEn = i === 1
            ? ['Tangent', 'Secant', 'External line', 'Radius']
            : i === 2
                ? ['Tangent', 'Secant', 'External line', 'Chord']
                : ['Has exactly one common point', 'Has two common points', 'Must pass center', 'Joins two points on circle'];

        var expZh = i === 1
            ? '两个公共点对应割线。'
            : i === 2
                ? '无公共点是外离。'
                : '切线定义是与圆仅一个公共点。';

        var expEn = i === 1
            ? 'Two intersections indicate a secant.'
            : i === 2
                ? 'No intersection means external line.'
                : 'A tangent has exactly one common point.';

        addTopic(
            'topic-tan-int-' + String(i + 1).padStart(3, '0'),
            '切线性质',
            'Tangent Properties',
            2 + (i % 2),
            3,
            'line_circle_position',
            item.qZh,
            item.qEn,
            optsZh,
            optsEn,
            item.ans,
            expZh,
            expEn
        );
    });

    [
        { p: 'PA', q: 'PB' },
        { p: 'PC', q: 'PD' },
        { p: 'PM', q: 'PN' },
        { p: 'PX', q: 'PY' }
    ].forEach(function (v, i) {
        addTopic(
            'topic-tan-eq-' + String(i + 1).padStart(3, '0'),
            '切线性质',
            'Tangent Properties',
            3,
            2,
            'equal_tangent_segments',
            '从圆外一点 P 向圆引两条切线段 ' + v.p + '、' + v.q + '，则（ ）',
            'From external point P, tangent segments ' + v.p + ' and ' + v.q + ' satisfy ( ).',
            [v.p + '=' + v.q, v.p + '>' + v.q, v.p + '<' + v.q, '无法比较'],
            [v.p + '=' + v.q, v.p + '>' + v.q, v.p + '<' + v.q, 'Cannot compare'],
            0,
            '同一点引圆的两条切线段长度相等。',
            'Two tangent segments from the same external point are equal.'
        );
    });

    [
        {
            qZh: '若 OA ⟂ l，且 A 在圆上，则可判定 l 是（ ）',
            qEn: 'If OA ⟂ l and A lies on the circle, then l is ( ).',
            ans: 2
        },
        {
            qZh: '判定一条直线为圆的切线，常用条件是（ ）',
            qEn: 'A common condition to prove a tangent is ( ).',
            ans: 1
        },
        {
            qZh: '下列可作为“切线判定条件”的是（ ）',
            qEn: 'Which can be used as a tangency criterion?',
            ans: 0
        },
        {
            qZh: '若直线过圆上一点并垂直该点半径，则该直线（ ）',
            qEn: 'If a line passes a point on the circle and is perpendicular to its radius, the line is ( ).',
            ans: 3
        }
    ].forEach(function (item, i) {
        var optsZh = i === 0
            ? ['弦', '割线', '切线', '直径']
            : i === 1
                ? ['与半径平行', '与圆上一点半径垂直', '经过圆心', '与弦重合']
                : i === 2
                    ? ['在圆上一点与半径垂直', '有两个公共点', '经过圆心', '半径等于直径']
                    : ['不是切线', '一定是割线', '无法判断', '是切线'];

        var optsEn = i === 0
            ? ['Chord', 'Secant', 'Tangent', 'Diameter']
            : i === 1
                ? ['Parallel to radius', 'Perpendicular to radius at a circle point', 'Passes center', 'Coincident with a chord']
                : i === 2
                    ? ['Perpendicular to radius at a point on circle', 'Has two intersections', 'Passes center', 'Radius equals diameter']
                    : ['Not tangent', 'Always secant', 'Cannot decide', 'Tangent'];

        addTopic(
            'topic-tan-judge-' + String(i + 1).padStart(3, '0'),
            '切线性质',
            'Tangent Properties',
            3 + (i % 2),
            2,
            'tangent_criterion',
            item.qZh,
            item.qEn,
            optsZh,
            optsEn,
            item.ans,
            '切线判定核心：过圆上一点且垂直该点半径。',
            'Tangency criterion: through a circle point and perpendicular to the radius there.'
        );
    });

    [
        {
            qZh: '切点一定（ ）',
            qEn: 'A tangency point must ( ).',
            optsZh: ['在圆上', '在圆外', '是圆心', '在任意位置'],
            optsEn: ['Be on the circle', 'Be outside', 'Be the center', 'Be arbitrary'],
            ans: 0
        },
        {
            qZh: '切线与半径的垂直关系发生在（ ）',
            qEn: 'The perpendicular relation between tangent and radius occurs at ( ).',
            optsZh: ['任一点', '切点', '圆心', '弧中点'],
            optsEn: ['Any point', 'Tangency point', 'Center', 'Arc midpoint'],
            ans: 1
        },
        {
            qZh: '从圆外点引圆的两条切线段，其公共起点（ ）',
            qEn: 'Two tangents from an external point share a start point that is ( ).',
            optsZh: ['在圆内', '在圆上', '在圆外', '在圆心'],
            optsEn: ['Inside', 'On the circle', 'Outside', 'At center'],
            ans: 2
        },
        {
            qZh: '切线知识中“长度相等”和“垂直半径”分别对应（ ）',
            qEn: 'In tangent properties, “equal length” and “perpendicular” correspond to ( ).',
            optsZh: ['同一点两切线段；切点处', '同弧两圆周角；圆心处', '同弦两端点；任意点', '同弧对应弦；切点处'],
            optsEn: ['Two tangents from same point; at tangency', 'Two inscribed angles; at center', 'Chord endpoints; any point', 'Arc-chord relation; at tangency'],
            ans: 0
        }
    ].forEach(function (item, i) {
        addTopic(
            'topic-tan-reason-' + String(i + 1).padStart(3, '0'),
            '切线性质',
            'Tangent Properties',
            4,
            2,
            'tangent_reasoning',
            item.qZh,
            item.qEn,
            item.optsZh,
            item.optsEn,
            item.ans,
            '结合切线定义与性质进行判断。',
            'Judge by combining tangent definition and properties.'
        );
    });

    [
        '同圆中，相等的弦所对的弧（ ）',
        '在同一圆内，若弦 AB=弦 CD，则弧 AB 与弧 CD（ ）',
        '同圆等弦对应的弧（ ）',
        '若两弦在同圆中长度相等，则其对弧（ ）'
    ].forEach(function (qZh, i) {
        addTopic(
            'topic-chord-eq-' + String(i + 1).padStart(3, '0'),
            '弦与弧',
            'Chords and Arcs',
            2 + (i % 2),
            3,
            'equal_chord_equal_arc',
            qZh,
            'In the same circle, equal chords subtend arcs that are ( ).',
            ['相等', '互补', '垂直', '无法判断'],
            ['Equal', 'Supplementary', 'Perpendicular', 'Cannot determine'],
            0,
            '同圆中等弦等弧。',
            'Equal chords subtend equal arcs in the same circle.'
        );
    });

    [
        {
            qZh: '同圆中，若弦 AB 比弦 CD 长，则 AB 到圆心距离与 CD 到圆心距离关系是（ ）',
            qEn: 'If chord AB is longer than CD in the same circle, distance from center is ( ).',
            ans: 0
        },
        {
            qZh: '同圆中，离圆心更近的弦通常（ ）',
            qEn: 'In the same circle, a chord nearer the center is usually ( ).',
            ans: 1
        },
        {
            qZh: '同圆中，若一条弦更短，则它离圆心通常（ ）',
            qEn: 'In the same circle, if a chord is shorter, it is usually ( ).',
            ans: 2
        },
        {
            qZh: '“弦长比较”与“到圆心距离比较”在同圆中的关系是（ ）',
            qEn: 'Relation between chord length and center distance in same circle is ( ).',
            ans: 3
        }
    ].forEach(function (item, i) {
        var optsZh = i === 0
            ? ['更近', '相等', '更远', '无法判断']
            : i === 1
                ? ['更短', '更长', '等长', '不相关']
                : i === 2
                    ? ['更近', '相等', '更远', '是直径']
                    : ['反向关系：弦越长离心越近', '正向关系：弦越长离心越远', '无关系', '一定相等'];

        var optsEn = i === 0
            ? ['Closer', 'Equal', 'Farther', 'Cannot determine']
            : i === 1
                ? ['Shorter', 'Longer', 'Equal', 'Unrelated']
                : i === 2
                    ? ['Closer', 'Equal', 'Farther', 'Always a diameter']
                    : ['Inverse relation: longer chord closer', 'Direct relation: longer farther', 'No relation', 'Always equal'];

        var expZh = i === 3
            ? '同圆中弦长与离心距离反向变化。'
            : '同圆中，弦越长离圆心越近。';

        var expEn = i === 3
            ? 'In a same circle, chord length inversely relates to center distance.'
            : 'In the same circle, longer chord is closer to center.';

        addTopic(
            'topic-chord-dist-' + String(i + 1).padStart(3, '0'),
            '弦与弧',
            'Chords and Arcs',
            3,
            2,
            'chord_center_distance',
            item.qZh,
            item.qEn,
            optsZh,
            optsEn,
            item.ans,
            expZh,
            expEn
        );
    });

    [
        {
            qZh: '同圆中，若两弦到圆心距离相等，则两弦（ ）',
            qEn: 'In the same circle, if two chords are equally distant from center, they are ( ).',
            ans: 0
        },
        {
            qZh: '同圆中，若两弦等长，则它们到圆心距离（ ）',
            qEn: 'In the same circle, if two chords are equal, their distances to center are ( ).',
            ans: 1
        },
        {
            qZh: '下列属于“等距等弦”逆命题的是（ ）',
            qEn: 'Which is the converse of equal-distance equal-chord?',
            ans: 2
        },
        {
            qZh: '同圆中“等弦”与“等距”关系是（ ）',
            qEn: 'In the same circle, relation between equal chords and equal distances is ( ).',
            ans: 0
        }
    ].forEach(function (item, i) {
        var optsZh = i === 0
            ? ['相等', '互补', '平行', '垂直']
            : i === 1
                ? ['不等', '相等', '一长一短', '无法比较']
                : i === 2
                    ? ['等弦推出等弧', '等弧推出等弦', '等弦推出等距', '切线垂直半径']
                    : ['互为等价关系（同圆）', '仅单向成立', '完全无关', '只在直径时成立'];

        var optsEn = i === 0
            ? ['Equal', 'Supplementary', 'Parallel', 'Perpendicular']
            : i === 1
                ? ['Not equal', 'Equal', 'One long one short', 'Cannot compare']
                : i === 2
                    ? ['Equal chords => equal arcs', 'Equal arcs => equal chords', 'Equal chords => equal distances', 'Tangent ⟂ radius']
                    : ['Equivalent in same circle', 'Only one-way true', 'Unrelated', 'Only for diameter'];

        addTopic(
            'topic-chord-eqd-' + String(i + 1).padStart(3, '0'),
            '弦与弧',
            'Chords and Arcs',
            3 + (i % 2),
            2,
            'equal_distance_equal_chord',
            item.qZh,
            item.qEn,
            optsZh,
            optsEn,
            item.ans,
            '同圆中“等弦⇔等距（到圆心）”成立。',
            'In the same circle, equal chords iff equal center distances.'
        );
    });

    [
        {
            qZh: '同圆中，较长的弦对应的弧通常（ ）',
            qEn: 'In the same circle, a longer chord usually corresponds to an arc that is ( ).',
            ans: 1
        },
        {
            qZh: '同圆中，若弧 AB 比弧 CD 长，则弦 AB 通常（ ）',
            qEn: 'In the same circle, if arc AB is longer than arc CD, then chord AB is usually ( ).',
            ans: 0
        },
        {
            qZh: '同圆中，弧与对应弦长度比较关系通常（ ）',
            qEn: 'In the same circle, relation between arc and its chord is usually ( ).',
            ans: 2
        },
        {
            qZh: '若两弧相等，则对应两弦（ ）',
            qEn: 'If two arcs are equal, their corresponding chords are ( ).',
            ans: 3
        }
    ].forEach(function (item, i) {
        var optsZh = i === 0
            ? ['更短', '更长', '相等', '不确定']
            : i === 1
                ? ['更长', '更短', '相等', '不相关']
                : i === 2
                    ? ['完全反向', '完全无关', '同向变化', '固定比值']
                    : ['互补', '垂直', '平行', '相等'];

        var optsEn = i === 0
            ? ['Shorter', 'Longer', 'Equal', 'Undetermined']
            : i === 1
                ? ['Longer', 'Shorter', 'Equal', 'Unrelated']
                : i === 2
                    ? ['Opposite trend', 'No relation', 'Same trend', 'Fixed ratio']
                    : ['Supplementary', 'Perpendicular', 'Parallel', 'Equal'];

        addTopic(
            'topic-chord-arc-' + String(i + 1).padStart(3, '0'),
            '弦与弧',
            'Chords and Arcs',
            4,
            2,
            'arc_chord_compare',
            item.qZh,
            item.qEn,
            optsZh,
            optsEn,
            item.ans,
            '同圆中，弧长与对应弦长通常同向变化。',
            'In the same circle, arc and corresponding chord generally vary in the same direction.'
        );
    });

    [
        {
            qZh: '圆心到弦的垂线平分该弦，这个结论属于（ ）',
            qEn: 'A perpendicular from center to a chord bisects the chord. This is ( ).',
            ans: 0
        },
        {
            qZh: '若圆心到弦 AB 的垂线交 AB 于点 M，则 M 常是 AB 的（ ）',
            qEn: 'If the perpendicular from center meets chord AB at M, then M is usually ( ).',
            ans: 1
        },
        {
            qZh: '在同圆中，若 M 是弦 AB 的中点，则 OM 与 AB 的关系通常（ ）',
            qEn: 'In the same circle, if M is midpoint of chord AB, relation of OM and AB is usually ( ).',
            ans: 2
        },
        {
            qZh: '弦中点、圆心连线与弦的关系可用于（ ）',
            qEn: 'The relation among chord midpoint, center and chord helps to ( ).',
            ans: 0
        }
    ].forEach(function (item, i) {
        var optsZh = i === 0
            ? ['弦的性质', '切线性质', '圆周角性质', '直径定义']
            : i === 1
                ? ['端点', '中点', '切点', '圆心']
                : i === 2
                    ? ['平行', '重合', '垂直', '不确定']
                    : ['判断弦与圆心位置关系', '只算周长', '证明切线段相等', '判断外接四边形'];

        var optsEn = i === 0
            ? ['Chord property', 'Tangent property', 'Inscribed-angle property', 'Diameter definition']
            : i === 1
                ? ['Endpoint', 'Midpoint', 'Tangency point', 'Center']
                : i === 2
                    ? ['Parallel', 'Coincident', 'Perpendicular', 'Undetermined']
                    : ['Analyze chord-center relation', 'Only compute perimeter', 'Prove equal tangents', 'Judge cyclic quadrilateral'];

        addTopic(
            'topic-chord-mid-' + String(i + 1).padStart(3, '0'),
            '弦与弧',
            'Chords and Arcs',
            4,
            2,
            'chord_midpoint_perpendicular',
            item.qZh,
            item.qEn,
            optsZh,
            optsEn,
            item.ans,
            '圆心到弦中点连线与弦垂直，反之亦常用。',
            'Center-midpoint line is perpendicular to the chord, and converses are often used.'
        );
    });

    topic.forEach(function (q, i) {
        addComp(
            'comp-mix-' + String(i + 1).padStart(3, '0'),
            q.topic,
            q.topicEn,
            q.difficulty,
            q.mastery,
            q.qType || 'mixed',
            q.question,
            q.questionEn,
            q.options,
            q.optionsEn,
            q.answer,
            q.explanation,
            q.explanationEn
        );
    });

    [
        {
            topic: '圆心角与圆周角',
            topicEn: 'Central and Inscribed Angles',
            diff: 4,
            type: 'mixed_reasoning',
            qZh: '在同一圆中，若圆周角 A=35°，另一个同弧圆周角 B 与 A 的关系是（ ）',
            qEn: 'In one circle, if inscribed angle A=35°, another inscribed angle B on same arc is ( ).',
            optsZh: ['B=35°', 'B=70°', 'B=17.5°', '无法确定'],
            optsEn: ['B=35°', 'B=70°', 'B=17.5°', 'Cannot determine'],
            ans: 0,
            expZh: '同弧所对圆周角相等。',
            expEn: 'Inscribed angles on the same arc are equal.'
        },
        {
            topic: '切线性质',
            topicEn: 'Tangent Properties',
            diff: 4,
            type: 'mixed_reasoning',
            qZh: '若从点 P 向圆引两条切线段 PA、PB，且 PA=8，则 PB（ ）',
            qEn: 'If PA and PB are tangent segments from P and PA=8, then PB is ( ).',
            optsZh: ['4', '8', '16', '无法判断'],
            optsEn: ['4', '8', '16', 'Cannot determine'],
            ans: 1,
            expZh: '同点引圆两切线段相等。',
            expEn: 'Two tangent segments from one external point are equal.'
        },
        {
            topic: '弦与弧',
            topicEn: 'Chords and Arcs',
            diff: 5,
            type: 'mixed_reasoning',
            qZh: '同圆中，若弦 AB 比弦 CD 长，且弦 CD 比弦 EF 长，则三者到圆心距离顺序是（ ）',
            qEn: 'In same circle, AB>CD>EF (chord length). Center distances order is ( ).',
            optsZh: ['d(AB)>d(CD)>d(EF)', 'd(AB)<d(CD)<d(EF)', 'd(AB)=d(CD)=d(EF)', '无法判断'],
            optsEn: ['d(AB)>d(CD)>d(EF)', 'd(AB)<d(CD)<d(EF)', 'All equal', 'Cannot determine'],
            ans: 1,
            expZh: '弦越长离圆心越近，所以距离反向排序。',
            expEn: 'Longer chord is closer to center, so distance order is reversed.'
        },
        {
            topic: '圆的基本性质',
            topicEn: 'Circle Basics',
            diff: 3,
            type: 'mixed_reasoning',
            qZh: '某圆半径 r=9 cm。点 A 在圆上，点 B 在圆内，点 C 在圆外，则 OA、OB、OC 的关系可能是（ ）',
            qEn: 'A circle has r=9. A on circle, B inside, C outside. Which may be true for OA,OB,OC?',
            optsZh: ['OA=9, OB=11, OC=8', 'OA=9, OB=5, OC=12', 'OA=8, OB=5, OC=12', 'OA=9, OB=9, OC=9'],
            optsEn: ['OA=9, OB=11, OC=8', 'OA=9, OB=5, OC=12', 'OA=8, OB=5, OC=12', 'OA=9, OB=9, OC=9'],
            ans: 1,
            expZh: '在圆上=9，圆内<9，圆外>9。',
            expEn: 'On circle =9, inside <9, outside >9.'
        },
        {
            topic: '圆心角与圆周角',
            topicEn: 'Central and Inscribed Angles',
            diff: 5,
            type: 'mixed_reasoning',
            qZh: '若同弧对应圆心角是圆周角的两倍，且圆周角为 x，则下列恒成立的是（ ）',
            qEn: 'If central angle is double inscribed angle on same arc and inscribed angle is x, always true is ( ).',
            optsZh: ['圆心角=x', '圆心角=2x', '圆心角=x/2', '圆心角=3x'],
            optsEn: ['Central=x', 'Central=2x', 'Central=x/2', 'Central=3x'],
            ans: 1,
            expZh: '定义关系：圆心角=2×圆周角。',
            expEn: 'By theorem: central angle = 2 × inscribed angle.'
        },
        {
            topic: '切线性质',
            topicEn: 'Tangent Properties',
            diff: 4,
            type: 'mixed_reasoning',
            qZh: '若直线 l 与圆在点 A 处相切，且 OA 是半径，则 ∠(OA,l)=（ ）',
            qEn: 'If line l is tangent at A and OA is radius, then ∠(OA,l)= ( ).',
            optsZh: ['30°', '45°', '60°', '90°'],
            optsEn: ['30°', '45°', '60°', '90°'],
            ans: 3,
            expZh: '切线与该点半径垂直。',
            expEn: 'Tangent is perpendicular to radius at the point.'
        },
        {
            topic: '弦与弧',
            topicEn: 'Chords and Arcs',
            diff: 4,
            type: 'mixed_reasoning',
            qZh: '同圆中，若弧 AB=弧 CD，且弦 CD=10 cm，则弦 AB（ ）',
            qEn: 'In same circle, if arc AB=arc CD and chord CD=10 cm, then chord AB is ( ).',
            optsZh: ['5 cm', '10 cm', '20 cm', '无法确定'],
            optsEn: ['5 cm', '10 cm', '20 cm', 'Cannot determine'],
            ans: 1,
            expZh: '同圆中等弧对应等弦。',
            expEn: 'Equal arcs in same circle correspond to equal chords.'
        },
        {
            topic: '圆的基本性质',
            topicEn: 'Circle Basics',
            diff: 3,
            type: 'mixed_reasoning',
            qZh: '若圆的直径由 12 cm 变为 18 cm，则半径增加了（ ）',
            qEn: 'If diameter changes from 12 to 18 cm, radius increases by ( ).',
            optsZh: ['2 cm', '3 cm', '6 cm', '9 cm'],
            optsEn: ['2 cm', '3 cm', '6 cm', '9 cm'],
            ans: 1,
            expZh: '半径从 6 变 9，增加 3。',
            expEn: 'Radius changes from 6 to 9, increase is 3.'
        },
        {
            topic: '圆心角与圆周角',
            topicEn: 'Central and Inscribed Angles',
            diff: 5,
            type: 'mixed_reasoning',
            qZh: '某弧对应圆周角为 42°，则对应圆心角和该圆周角的差是（ ）',
            qEn: 'Inscribed angle is 42°. Difference between corresponding central and inscribed angle is ( ).',
            optsZh: ['21°', '42°', '63°', '84°'],
            optsEn: ['21°', '42°', '63°', '84°'],
            ans: 1,
            expZh: '圆心角84°，差值84-42=42°。',
            expEn: 'Central is 84°, difference is 42°.'
        },
        {
            topic: '切线性质',
            topicEn: 'Tangent Properties',
            diff: 4,
            type: 'mixed_reasoning',
            qZh: '下列哪项组合能直接支持“某直线是切线”的结论（ ）',
            qEn: 'Which combination directly supports “a line is tangent”?',
            optsZh: ['过圆上一点且垂直该点半径', '过圆心且与半径平行', '与圆有两个交点', '与弦长度相等'],
            optsEn: ['Through a circle point and perpendicular to its radius', 'Through center and parallel to a radius', 'Two intersections with circle', 'Equal to chord length'],
            ans: 0,
            expZh: '这是标准切线判定条件。',
            expEn: 'This is the standard tangency criterion.'
        },
        {
            topic: '弦与弧',
            topicEn: 'Chords and Arcs',
            diff: 5,
            type: 'mixed_reasoning',
            qZh: '同圆中，若 d(AB)=d(CD)（到圆心距离），则下列一定成立的是（ ）',
            qEn: 'In same circle, if center distances d(AB)=d(CD), what must be true?',
            optsZh: ['弦 AB=弦 CD', '弧 AB 与弧 CD 互补', 'AB 经过圆心', 'AB 与 CD 平行'],
            optsEn: ['Chord AB=Chord CD', 'Arcs are supplementary', 'AB passes center', 'AB parallel CD'],
            ans: 0,
            expZh: '同圆中等距等弦。',
            expEn: 'Equal center distances imply equal chords in same circle.'
        },
        {
            topic: '圆的基本性质',
            topicEn: 'Circle Basics',
            diff: 4,
            type: 'mixed_reasoning',
            qZh: '半径与直径关系可写成 d=2r。若 d=2r+2 成立，则说明（ ）',
            qEn: 'If someone writes d=2r+2 instead of d=2r, it means ( ).',
            optsZh: ['公式正确', '单位换算导致', '关系写错了', '只在大圆成立'],
            optsEn: ['Formula correct', 'Unit conversion issue', 'The relation is wrong', 'Only for large circles'],
            ans: 2,
            expZh: '定义关系固定是 d=2r。',
            expEn: 'The exact definition is d=2r.'
        }
    ].forEach(function (q, i) {
        addComp(
            'comp-cross-' + String(i + 1).padStart(3, '0'),
            q.topic,
            q.topicEn,
            q.diff,
            2,
            q.type,
            q.qZh,
            q.qEn,
            q.optsZh,
            q.optsEn,
            q.ans,
            q.expZh,
            q.expEn
        );
    });

    function levelLabel(d) {
        if (d <= 2) return { zh: '基础', en: 'Basic' };
        if (d === 3) return { zh: '进阶', en: 'Intermediate' };
        return { zh: '提高', en: 'Advanced' };
    }

    diversify(topic, ['topic', 'qType']).slice(0, 40).forEach(function (q, i) {
        var lv = levelLabel(Number(q.difficulty || 3));
        daily.push(makeQuestion(
            'daily-' + String(i + 1).padStart(3, '0'),
            'daily',
            q.topic,
            q.topicEn,
            q.difficulty,
            q.mastery,
            '今日精选 ' + (i + 1) + '：' + q.question,
            'Daily Pick ' + (i + 1) + ': ' + q.questionEn,
            q.options,
            q.optionsEn,
            q.answer,
            q.explanation,
            q.explanationEn,
            {
                difficultyLabel: lv.zh,
                difficultyLabelEn: lv.en,
                qType: q.qType
            }
        ));
    });

    var topicFinal = diversify(topic, ['topic', 'qType']);
    var compFinal = diversify(comprehensive, ['topic', 'qType']);
    var dailyFinal = daily.slice();
    var all = topicFinal.concat(compFinal).concat(dailyFinal);

    return {
        all: all,
        topic: topicFinal,
        comprehensive: compFinal,
        daily: dailyFinal
    };
})();
